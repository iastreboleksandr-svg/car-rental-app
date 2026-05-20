// components/Spinner.tsx
import React from "react";

type SpinnerSize = "sm" | "md" | "lg";
type SpinnerColor = "inherit" | "primary" | "white";

interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
}

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 40,
};

const colorMap: Record<SpinnerColor, string> = {
  inherit: "currentColor",
  primary: "#6366f1",
  white: "#ffffff",
};

export default function Spinner({
  size = "md",
  color = "inherit",
}: SpinnerProps) {
  const px = sizeMap[size];
  const stroke = colorMap[color];
  const thickness = size === "sm" ? 2 : size === "md" ? 2.5 : 3.5;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Loading"
      role="status"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <style>{`
        @keyframes spinner-rotate {
          100% { transform: rotate(360deg); }
        }
        @keyframes spinner-dash {
          0%   { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
          50%  { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
          100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
        }
        .spinner-circle {
          animation:
            spinner-rotate 1.4s linear infinite,
            spinner-dash   1.4s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
      <circle
        className="spinner-circle"
        cx="12"
        cy="12"
        r="10"
        stroke={stroke}
        strokeWidth={thickness}
        strokeLinecap="round"
      />
    </svg>
  );
}