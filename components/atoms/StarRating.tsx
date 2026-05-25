// StarRating
"use client";

import { useState } from "react";

interface StarRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  totalCount?: number;
}

const sizeMap = {
  sm: 14,
  md: 20,
  lg: 28,
};

export default function StarRating({
  value = 0,
  onChange,
  readonly = false,
  size = "md",
  showValue = false,
  totalCount,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const px = sizeMap[size];
  const isReadonly = readonly || !onChange;
  const displayed = hovered ?? value;

  const gap = Math.round(px * 0.2);
  const textSize = px <= 14 ? 11 : px <= 20 ? 14 : 18;

  function handleClick(star: number) {
    if (isReadonly) return;
    onChange?.(star);
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: gap * 2,
        userSelect: "none",
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", alignItems: "center", gap }}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= displayed;
          const isHalf =
            !filled && star - 0.5 <= displayed && displayed % 1 !== 0;

          return (
            <div
              key={star}
              role={isReadonly ? undefined : "button"}
              aria-label={isReadonly ? undefined : `${star} stars`}
              tabIndex={isReadonly ? undefined : 0}
              onMouseEnter={() => !isReadonly && setHovered(star)}
              onMouseLeave={() => !isReadonly && setHovered(null)}
              onClick={() => handleClick(star)}
              onKeyDown={(e) => {
                if (!isReadonly && (e.key === "Enter" || e.key === " "))
                  handleClick(star);
              }}
              style={{
                cursor: isReadonly ? "default" : "pointer",
                transition: "transform 0.12s ease",
                transform:
                  !isReadonly && hovered === star ? "scale(1.2)" : "scale(1)",
              }}
            >
              <svg
                width={px}
                height={px}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id={`half-${star}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#e5e7eb" />
                  </linearGradient>
                </defs>
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill={
                    filled
                      ? "#f59e0b"
                      : isHalf
                      ? `url(#half-${star})`
                      : "#e5e7eb"
                  }
                  stroke={filled || isHalf ? "#f59e0b" : "#d1d5db"}
                  strokeWidth="1"
                  strokeLinejoin="round"
                  style={{ transition: "fill 0.15s ease" }}
                />
              </svg>
            </div>
          );
        })}
      </div>

      {/* showValue */}
      {showValue && (
        <span
          style={{
            fontSize: textSize,
            fontWeight: 600,
            color: "#374151",
            lineHeight: 1,
          }}
        >
          {value.toFixed(1)}
        </span>
      )}

      {/* totalCount */}
      {totalCount !== undefined && (
        <span
          style={{
            fontSize: textSize,
            color: "#9ca3af",
            lineHeight: 1,
          }}
        >
          ({totalCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}