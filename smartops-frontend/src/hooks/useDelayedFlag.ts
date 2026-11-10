"use client";

import { useEffect, useRef, useState } from "react";

// แสดงเมื่อ active นานเกิน delay และเมื่อแสดงแล้วค้างไว้อย่างน้อย minDuration
export function useDelayedFlag(
  active: boolean,
  delay = 200,
  minDuration = 400,
) {
  const [visible, setVisible] = useState(false);
  const shownAt = useRef<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (active) {
      timer = setTimeout(() => {
        shownAt.current = Date.now();
        setVisible(true);
      }, delay);
    } else if (shownAt.current !== null) {
      const elapsed = Date.now() - shownAt.current;
      timer = setTimeout(
        () => {
          shownAt.current = null;
          setVisible(false);
        },
        Math.max(0, minDuration - elapsed),
      );
    }

    return () => clearTimeout(timer);
  }, [active, delay, minDuration]);

  return visible;
}
