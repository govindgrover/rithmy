
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CompletionDialog } from "@/components/scroll-sutra/completion-dialog";
import { StopConfirmationDialog } from "@/components/scroll-sutra/stop-confirmation-dialog";
import { ControlPanel } from "@/components/scroll-sutra/control-panel";
import { ScrollCounter } from "@/components/scroll-sutra/scroll-counter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Square } from "lucide-react";
import { ScrollIndicator } from "@/components/scroll-sutra/scroll-indicator";
import { APP_CONFIG } from "@/config/app";
import { formatDuration } from "@/lib/utils";
import { ScrollHint } from "@/components/scroll-sutra/scroll-hint";
import { useIsMobile } from "@/hooks/use-mobile";

type SessionState = "idle" | "active" | "paused" | "completed";

export default function Home() {
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [scrollCount, setScrollCount] = useState(0);
  const [targetScrolls, setTargetScrolls] = useState(0);
  
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const audioPlayer = useRef<HTMLAudioElement | null>(null);

  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [sessionDuration, setSessionDuration] = useState("0s");

  const [isPulsing, setIsPulsing] = useState(false);
  const pulseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showScrollHint, setShowScrollHint] = useState(false);
  
  // Set initial target from localStorage & check for first visit
  useEffect(() => {
    try {
        const storedTarget = localStorage.getItem(APP_CONFIG.LOCAL_STORAGE_KEY);
        if (storedTarget) {
            setTargetScrolls(parseInt(storedTarget, 10));
        }

        const hasVisited = localStorage.getItem(APP_CONFIG.VISITED_KEY);
        if (!hasVisited) {
          setShowScrollHint(true);
        }
    } catch (error) {
        console.warn("Could not access localStorage. Continuing without stored settings.");
    }

    // Initialize audio element
    audioPlayer.current = new Audio(APP_CONFIG.AUDIO_URL);
    audioPlayer.current.loop = true;
    audioPlayer.current.volume = 0.5;
    // Preload the audio to be ready
    audioPlayer.current.load();
  }, []);

  // Save target to localStorage
  useEffect(() => {
    try {
        if (sessionState === 'idle' && targetScrolls > 0) {
            localStorage.setItem(APP_CONFIG.LOCAL_STORAGE_KEY, targetScrolls.toString());
        }
    } catch (error) {
         console.warn("Could not access localStorage. Target will not be saved.");
    }
  }, [targetScrolls, sessionState]);

  const handleStart = () => {
    if (targetScrolls <= 0) {
      toast({
        title: "Set a Target",
        description: "Please set a target number of scrolls to begin.",
        variant: "destructive",
      });
      return;
    }

    // Directly play audio on user interaction for mobile browser compatibility
    if (isAudioEnabled && audioPlayer.current) {
      audioPlayer.current.play().catch(e => console.error("Audio play failed:", e));
    }

    if (showScrollHint) {
      localStorage.setItem(APP_CONFIG.VISITED_KEY, 'true');
    }
    setScrollCount(0);
    setSessionStartTime(Date.now());
    setSessionState("active");
  };

  const handleStopRequest = () => {
    setSessionState("paused");
  };
  
  const handleResume = () => {
    setSessionState("active");
  };

  const handleStopConfirm = useCallback((completed = false) => {
    if (sessionStartTime) {
      const totalDuration = Date.now() - sessionStartTime;
      setSessionDuration(formatDuration(totalDuration));
    }
    // Vibrate on manual stop as well
    if (!completed) {
        if (navigator.vibrate) navigator.vibrate([200, 50, 200]);
    }
    setSessionState(completed ? "completed" : "idle");
  }, [sessionStartTime]);

  const handleReset = () => {
    setSessionState("idle");
    setScrollCount(0);
  };
  
  const triggerPulse = () => {
    if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    setIsPulsing(true);
    pulseTimeoutRef.current = setTimeout(() => setIsPulsing(false), 400);
  };

  const processScroll = useCallback(() => {
    if (sessionState !== 'active') return;

    if (showScrollHint) setShowScrollHint(false);

    setScrollCount(prev => {
      const newCount = prev + 1;
      if (newCount >= targetScrolls) {
        handleStopConfirm(true);
      } else {
        triggerPulse();
        if (navigator.vibrate) navigator.vibrate(50);
      }
      return newCount;
    });
  }, [targetScrolls, handleStopConfirm, sessionState, showScrollHint]);


  // Scroll handler
  useEffect(() => {
    if (sessionState !== 'active') {
      return;
    }
  
    let isScrolling = false;
    let lastTouchY = 0;
  
    const handleWheel = (event: WheelEvent) => {
      // Only process scrolls in one direction (down)
      if (event.deltaY > 0) {
        if (!isScrolling) {
          isScrolling = true;
          processScroll();
          setTimeout(() => { isScrolling = false; }, 300);
        }
      }
    };
  
    const handleTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0].clientY;
    };
  
    const handleTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0].clientY;
      // Only process scrolls in one direction (upwards swipe)
      if (touchY < lastTouchY) {
         if (!isScrolling) {
          isScrolling = true;
          processScroll();
          setTimeout(() => { isScrolling = false; }, 300);
        }
      }
      lastTouchY = touchY;
    };
  
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
  
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [sessionState, processScroll]);


  // Audio playback effect
  useEffect(() => {
    const player = audioPlayer.current;
    if (!player) return;

    if (sessionState === 'active' && isAudioEnabled) {
      player.play().catch(e => console.error("Audio play failed during state change:", e));
    } else {
      player.pause();
      if (sessionState === 'idle' || sessionState === 'completed') {
        player.currentTime = 0;
      }
    }
    
  }, [sessionState, isAudioEnabled]);


  // Completion effect
  useEffect(() => {
    if (sessionState === "completed") {
      if (navigator.vibrate) navigator.vibrate([200, 50, 200]);
    }
  }, [sessionState]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
       if (audioPlayer.current) {
        audioPlayer.current.pause();
        audioPlayer.current = null;
       }
    };
  }, []);

  const renderActiveSessionUI = () => (
    <div className="fixed inset-0 p-4 sm:p-8 pointer-events-none">
       <div className="absolute top-4 left-4 right-4 flex justify-between items-end">
        <ScrollCounter count={scrollCount} />
        <div className="flex flex-col items-end">
          <ScrollIndicator isPulsing={isPulsing} />
        </div>
      </div>

       {/* Stop button */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
        <Button variant="outline" size="icon" className="h-20 w-20 rounded-full bg-background/20 backdrop-blur-sm" onClick={handleStopRequest}>
            <Square className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
  
  const renderIdleUI = () => (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none p-4">
        <div className="pointer-events-auto">
          <ControlPanel
            targetScrolls={targetScrolls}
            setTargetScrolls={setTargetScrolls}
            isAudioEnabled={isAudioEnabled}
            onAudioEnabledChange={setIsAudioEnabled}
            onStart={handleStart}
          />
        </div>
    </div>
  );


  return (
    <main className="h-dvh w-screen overflow-hidden">
      <div id="scroll-area" className="absolute inset-0 bg-transparent z-0 h-full w-full"></div>
      
      <div className="relative z-10 h-full w-full pointer-events-none">
         {sessionState === 'idle' && renderIdleUI()}
         {(sessionState === 'active' || sessionState === 'paused') && renderActiveSessionUI()}
      </div>

      <ScrollHint isVisible={sessionState === 'active' && showScrollHint} isMobile={isMobile ?? false} />

      <StopConfirmationDialog
        isOpen={sessionState === "paused"}
        onContinue={handleResume}
        onConfirmStop={() => handleStopConfirm(false)}
      />

      <CompletionDialog
        isOpen={sessionState === "completed"}
        onContinue={handleReset}
        scrolls={scrollCount}
        duration={sessionDuration}
      />
    </main>
  );
}
