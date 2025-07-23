
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Play } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/common/logo";
import { APP_CONFIG } from "@/config/app";

type ControlPanelProps = {
  targetScrolls: number;
  setTargetScrolls: (value: number) => void;
  isAudioEnabled: boolean;
  onAudioEnabledChange: (enabled: boolean) => void;
  onStart: () => void;
};

export function ControlPanel({
  targetScrolls,
  setTargetScrolls,
  isAudioEnabled,
  onAudioEnabledChange,
  onStart,
}: ControlPanelProps) {

  return (
    <Card className="shadow-2xl bg-card/80 backdrop-blur-sm w-full max-w-sm">
      <CardHeader className="items-center pb-0">
        <Logo className="w-20 h-20" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="targetScrolls">Target Scrolls</Label>
          <Input
            id="targetScrolls"
            type="number"
            placeholder="e.g., 108"
            value={targetScrolls > 0 ? targetScrolls : ""}
            onChange={(e) =>
              setTargetScrolls(Math.max(0, parseInt(e.target.value, 10) || 0))
            }
            className="text-center text-lg"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <Label htmlFor="audio-switch">Background Audio</Label>
            <p className="text-xs text-muted-foreground">
              Gentle ambient soundscape.
            </p>
          </div>
          <Switch
            id="audio-switch"
            checked={isAudioEnabled}
            onCheckedChange={onAudioEnabledChange}
            aria-label="Toggle background audio"
          />
        </div>

        <div className="flex justify-center pt-2">
          <Button
            size="lg"
            className="w-full font-bold text-lg"
            onClick={onStart}
            disabled={targetScrolls <= 0}
          >
            <Play className="mr-2" />
            Start
          </Button>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-evenly items-center text-xs p-4">
          <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/legal/attributions" className="text-muted-foreground hover:text-foreground transition-colors">
              Attributions
          </Link>
      </CardFooter>
    </Card>
  );
}
