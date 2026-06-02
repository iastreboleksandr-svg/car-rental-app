"use client";

import React, { useState } from "react";
import Image from "next/image";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string | null;
  firstName?: string;
  lastName?: string;
  size?: AvatarSize;
  onClick?: () => void;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; px: number }> = {
  sm: { container: "w-8 h-8",   text: "text-xs",  px: 32  },
  md: { container: "w-12 h-12", text: "text-sm",  px: 48  },
  lg: { container: "w-20 h-20", text: "text-xl",  px: 80  },
  xl: { container: "w-30 h-30", text: "text-3xl", px: 120 },
};

const bgColors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-red-500",
  "bg-indigo-500",
];

const getColor = (firstName: string, lastName: string) => {
  const str = `${firstName}${lastName}`;
  const index = str.charCodeAt(0) % bgColors.length;
  return bgColors[index];
};

const getInitials = (firstName: string, lastName: string) => {
  const f = firstName?.[0]?.toUpperCase() ?? "";
  const l = lastName?.[0]?.toUpperCase() ?? "";
  return `${f}${l}` || "?";
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  firstName = "",
  lastName = "",
  size = "md",
  onClick,
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const { container, text, px } = sizeStyles[size];
  const showImage = src && !imgError;
  const initials = getInitials(firstName, lastName);
  const bgColor = getColor(firstName, lastName);

  const baseStyles = [
    "relative rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 select-none",
    container,
    onClick ? "cursor-pointer ring-2 ring-transparent hover:ring-[#48C964] transition-all duration-150" : "",
    className,
  ].join(" ");

  const content = (
    <>
      {!showImage && (
        <span className={`${bgColor} w-full h-full flex items-center justify-center text-white font-semibold ${text}`}>
          {initials}
        </span>
      )}

      {showImage && (
        <>
          {imgLoading && (
            <span className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <Image
            src={src}
            alt={`${firstName} ${lastName}`}
            width={px}
            height={px}
            className={`object-cover w-full h-full transition-opacity duration-200 ${imgLoading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setImgLoading(false)}
            onError={() => { setImgError(true); setImgLoading(false); }}
          />
        </>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={baseStyles}
        aria-label={`${firstName} ${lastName}`}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={baseStyles}>
      {content}
    </div>
  );
};

export default Avatar;