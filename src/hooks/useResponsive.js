import { useEffect, useMemo, useState } from "react";

const BREAKPOINTS = {
  tablet: 768,
  desktop: 1024
}

function determineDisplaySize(width) {
  if (width >= BREAKPOINTS.tablet) {
    if (width > BREAKPOINTS.desktop) {
      return 'desktop';
    } else {
      return 'tablet';
    }
  }
  return 'mobile';
}

export function useResponsive() {
  const [ currentBreakPoint, setCurrentBreakPoint ] = useState(determineDisplaySize(window.innerWidth));

  useEffect(() => {
    const handler = () => setCurrentBreakPoint(determineDisplaySize(window.innerWidth));
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return useMemo(() => currentBreakPoint, [currentBreakPoint]);
}
