"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { PinFormation } from "./motifs";

/** next/image with a designed fallback, so a failed load never shows a broken-image icon. */
export function Photo({ className = "", alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={`absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--color-coral),var(--color-cobalt)_70%)] text-cream ${className}`}
      >
        <PinFormation className="text-3xl opacity-70" />
      </div>
    );
  }
  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      quality={props.quality ?? 75}
    />
  );
}
