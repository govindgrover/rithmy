import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Run the check only on the client-side after the component has mounted
    checkDevice();
    
    window.addEventListener("resize", checkDevice);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return isMobile;
}
