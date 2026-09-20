import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export default function useDeviceMode() {
  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined') return 'desktop';
    return window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop';
  });

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const handler = (e) => {
      setMode(e.matches ? 'mobile' : 'desktop');
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', handler);
    } else {
      mql.addListener(handler);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handler);
      } else {
        mql.removeListener(handler);
      }
    };
  }, []);

  return mode;
}
