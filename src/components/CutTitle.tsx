import React from "react";

interface CutTitleProps {
  children: React.ReactNode;
  className?: string;
  position?: "top-left" | "top-right";
}

export function CutTitle({ children, className = "", position = "top-left" }: CutTitleProps) {
  if (position === "top-right") {
    return (
      <div className={`absolute top-0 -right-2 sm:right-0 p-3 sm:p-4 md:p-6 bg-white inline-flex items-center justify-center z-10 rounded-bl-2xl md:rounded-bl-3xl shadow-sm ${className}`}>
        
        <div className="font-semibold text-sm sm:text-base md:text-2xl lg:text-3xl tracking-tight text-neutral-900 drop-shadow-sm">
          {children}
        </div>

        {/* Left Concave Curve (Top Edge) */}
        <svg className="absolute top-0 -left-3 sm:-left-4 md:-left-6 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 fill-white pointer-events-none drop-shadow-sm" viewBox="0 0 32 32">
          {/* Flipped horizontally from top-left */}
          <path d="M32,0 H0 A32,32 0 0,1 32,32 Z" />
        </svg>

        {/* Bottom Concave Curve (Right Edge) */}
        <svg className="absolute -bottom-3 sm:-bottom-4 md:-bottom-6 right-2 sm:right-0 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 fill-white pointer-events-none drop-shadow-sm" viewBox="0 0 32 32">
          {/* Flipped horizontally from top-left */}
          <path d="M32,0 H0 A32,32 0 0,1 32,32 Z" />
        </svg>
      </div>
    );
  }

  // default top-left
  return (
    <div className={`absolute top-0 -left-2 sm:left-0 p-3 sm:p-4 md:p-6 bg-white inline-flex items-center justify-center z-10 rounded-br-2xl md:rounded-br-3xl shadow-sm ${className}`}>
      
      <div className="font-semibold text-sm sm:text-base md:text-2xl lg:text-3xl tracking-tight text-neutral-900 drop-shadow-sm">
        {children}
      </div>

      {/* Right Concave Curve (Top Edge) */}
      <svg className="absolute top-0 -right-3 sm:-right-4 md:-right-6 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 fill-white pointer-events-none drop-shadow-sm" viewBox="0 0 32 32">
        <path d="M0,0 H32 A32,32 0 0,0 0,32 Z" />
      </svg>

      {/* Bottom Concave Curve (Left Edge) */}
      <svg className="absolute -bottom-3 sm:-bottom-4 md:-bottom-6 left-2 sm:left-0 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 fill-white pointer-events-none drop-shadow-sm" viewBox="0 0 32 32">
        <path d="M0,0 H32 A32,32 0 0,0 0,32 Z" />
      </svg>
    </div>
  );
}
