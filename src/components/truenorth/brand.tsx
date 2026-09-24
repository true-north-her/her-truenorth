import type { HTMLAttributes, ReactNode } from "react";
import { Compass } from "lucide-react";

import logoAsset from "@/assets/truenorth-logo.png.asset.json";
import symbolAsset from "@/assets/truenorth-symbol.png.asset.json";
import wordmarkAsset from "@/assets/truenorth-wordmark.png.asset.json";
import { cn } from "@/lib/utils";

type BrandMarkProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "primary" | "symbol" | "wordmark" | "monochrome";
  imageClassName?: string;
};

function BrandMark({ variant = "primary", className, imageClassName, ...props }: BrandMarkProps) {
  const source = variant === "symbol" ? symbolAsset : variant === "wordmark" ? wordmarkAsset : logoAsset;
  const alt = variant === "symbol" ? "TrueNorth compass" : "TrueNorth";

  return (
    <div className={cn("inline-flex shrink-0 items-center", variant === "monochrome" && "brand-monochrome", className)} {...props}>
      <img
        src={source.url}
        alt={alt}
        className={cn("block h-auto max-w-full object-contain", imageClassName)}
      />
    </div>
  );
}

function EditorialLabel({ number, children, inverse = false, className }: { number: string; children: ReactNode; inverse?: boolean; className?: string }) {
  return (
    <div className={cn("editorial-label", inverse && "editorial-label-inverse", className)}>
      <span className="font-display text-lg">{number}</span>
      <span className="editorial-rule" aria-hidden="true" />
      <span className="text-xs font-bold uppercase tracking-[0.18em]">{children}</span>
    </div>
  );
}

function CompassDivider({ className }: { className?: string }) {
  return (
    <div className={cn("direction-line", className)} aria-hidden="true">
      <Compass className="size-6 bg-background text-primary" strokeWidth={1.2} />
    </div>
  );
}

export { BrandMark, CompassDivider, EditorialLabel };