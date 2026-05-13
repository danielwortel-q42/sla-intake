"use client";

import {
  Globe, Building, UserCog, CreditCard, Server, User, Cloud,
  ThumbsUp, AlertTriangle, TrendingDown, XCircle,
  CheckCircle, MinusCircle, AlertOctagon,
  PhoneCall, RefreshCw, Eye,
} from "lucide-react";
import type { Option } from "@/lib/questions";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Building, UserCog, CreditCard, Server, User, Cloud,
  ThumbsUp, AlertTriangle, TrendingDown, XCircle,
  CheckCircle, MinusCircle, AlertOctagon,
  PhoneCall, RefreshCw, Eye,
};

interface CardOptionProps {
  option: Option;
  selected: boolean;
  onSelect: () => void;
}

export function CardOption({ option, selected, onSelect }: CardOptionProps) {
  const Icon = option.icon ? iconMap[option.icon] : null;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border-2 p-3 text-left w-full transition-all",
        "hover:border-blue-300 hover:bg-blue-50/40",
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-border bg-card"
      )}
    >
      {Icon && (
        <Icon className={cn("h-4 w-4 shrink-0", selected ? "text-blue-600" : "text-muted-foreground")} />
      )}
      <div className="min-w-0">
        <div className={cn("text-sm font-medium leading-snug", selected ? "text-blue-700" : "text-foreground")}>
          {option.label}
        </div>
        {option.subtitle && (
          <div className="text-xs text-muted-foreground mt-0.5 leading-snug">
            {option.subtitle}
          </div>
        )}
      </div>
    </button>
  );
}
