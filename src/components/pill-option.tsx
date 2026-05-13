"use client";

import type { Option } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PillOptionProps {
  option: Option;
  selected: boolean;
  onSelect: () => void;
}

export function PillOption({ option, selected, onSelect }: PillOptionProps) {
  return (
    <Button
      type="button"
      size="sm"
      variant={selected ? "secondary" : "outline"}
      onClick={onSelect}
      className="rounded-full px-4 py-2 text-sm font-medium transition-all"
    >
      {option.label}
    </Button>
  );
}
