"use client";

import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!triggered.current) {
        triggered.current = true;
        setIsExiting(true);
        setTimeout(onComplete, 700);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={[
        "fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]",
        "transition-[opacity,transform] duration-700",
        isExiting ? "opacity-0 scale-[1.04] pointer-events-none" : "opacity-100 scale-100",
      ].join(" ")}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="relative flex items-center justify-center pb-10 scale-75 md:scale-100">
        {/* Name */}
        <h1
          className="select-none whitespace-nowrap text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-none tracking-tight text-white"
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            animation: "nameReveal 1s cubic-bezier(0.16,1,0.3,1) 0.1s forwards",
            opacity: 0,
          }}
        >
          Anas Masama
        </h1>

        {/* Signature SVG */}
        <svg
          className="pointer-events-none absolute overflow-visible"
          style={{ inset: "-35% -5%", width: "110%", height: "170%" }}
          viewBox="0 0 900 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            style={{
              fill: "none",
              stroke: "#6efcb0",
              strokeWidth: 3.5,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeDasharray: 2800,
              strokeDashoffset: 2800,
              animation: "drawSig 4s cubic-bezier(0.4,0,0.2,1) 0.5s forwards",
            }}
            d="M 20 160 C 35 135, 45 110, 60 90 C 72 72, 80 65, 92 58 C 102 52, 108 54, 106 66 C 104 78, 93 92, 95 102 C 97 110, 110 105, 126 95 C 142 84, 158 68, 172 60 C 183 53, 190 56, 187 68 C 184 78, 173 90, 177 98 C 181 106, 198 98, 220 88 C 244 77, 268 64, 285 73 C 296 79, 294 96, 282 108 C 272 118, 258 122, 268 130 C 278 138, 302 125, 334 108 C 368 90, 408 62, 438 35 C 460 14, 478 3, 500 6 C 518 9, 528 22, 524 38 C 520 52, 507 68, 500 82 C 493 94, 497 103, 510 98 C 526 91, 544 72, 566 60 C 584 50, 596 52, 592 66 C 588 78, 575 92, 580 102 C 585 111, 603 102, 626 91 C 652 78, 680 62, 702 53 C 722 44, 734 48, 730 62 C 726 75, 710 90, 716 100 C 722 109, 746 98, 774 86 C 804 72, 836 55, 856 46 C 872 39, 884 42, 886 56 C 888 68, 876 85, 870 100 C 864 115, 858 130, 864 138"
          />
        </svg>

        {/* © 2026 badge */}
        <span
          className="absolute bottom-0 right-0 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wider"
          style={{
            color: "#6efcb0",
            animation: "nameReveal 0.45s ease 0.3s forwards",
            opacity: 0,
          }}
        >
          © 2026
        </span>
      </div>
    </div>
  );
}
