"use client";

import type { Option } from "@/lib/questions";
import { cn } from "@/lib/utils";

interface PillOptionProps {
  option: Option;
  selected: boolean;
  onSelect: () => void;
}

export function PillOption({ option, selected, onSelect }: PillOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "rounded-full border-2 px-4 py-2 text-sm font-medium transition-all hover:bg-blue-50/50",
        selected
          ? "border-blue-500 bg-blue-50 text-blue-700"
          : "border-border bg-card text-foreground"
      )}
    >
      {option.label}
    </button>
  );
}
