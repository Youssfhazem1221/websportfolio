"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  value: string; // e.g. "$2.7k", "30k+", "100k+", "93%"
};

/** Split "$2.7k" into prefix / number / suffix so only the number animates. */
function parseValue(value: string) {
  const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
  if (!match) return null;

  const hasDecimal = match[2].includes(".");
  return {
    prefix: match[1],
    targetNum: parseFloat(match[2]),
    suffix: match[3],
    hasDecimal,
    decimals: hasDecimal ? (match[2].split(".")[1] || "").length : 0,
  };
}

export default function AnimatedCounter({ value }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const parsed = useMemo(() => parseValue(value), [value]);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView || !parsed) return;

    const { prefix, targetNum, suffix, hasDecimal, decimals } = parsed;
    const duration = 1600; // ms
    const startTime = performance.now();
    let frame = 0;

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentNum = targetNum * easedProgress;

      const formattedNum = hasDecimal
        ? currentNum.toFixed(decimals)
        : Math.round(currentNum).toLocaleString("en-US");

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        frame = requestAnimationFrame(updateCounter);
      }
    };

    frame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frame);
  }, [isInView, parsed]);

  /*
    Values with no number to count have nothing to animate, so they're derived
    straight from the prop rather than pushed into state from the effect — the
    cascading render the compiler lint rejects.
  */
  return <span ref={ref}>{parsed ? displayValue : isInView ? value : "0"}</span>;
}
