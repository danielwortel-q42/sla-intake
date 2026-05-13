"use client";

import {
  Globe,
  Building,
  UserCog,
  CreditCard,
  Server,
  User,
  Cloud,
  ThumbsUp,
  AlertTriangle,
  TrendingDown,
  XCircle,
  CheckCircle,
  MinusCircle,
  AlertOctagon,
  PhoneCall,
  RefreshCw,
  Eye,
} from "lucide-react";
import type { Option } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Building,
  UserCog,
  CreditCard,
  Server,
  User,
  Cloud,
  ThumbsUp,
  AlertTriangle,
  TrendingDown,
  XCircle,
  CheckCircle,
  MinusCircle,
  AlertOctagon,
  PhoneCall,
  RefreshCw,
  Eye,
};

interface CardOptionProps {
  option: Option;
  selected: boolean;
  onSelect: () => void;
}

export function CardOption({ option, selected, onSelect }: CardOptionProps) {
  const Icon = option.icon ? iconMap[option.icon] : null;

  return (
    <Button
      type="button"
      onClick={onSelect}
      variant="outline"
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg p-4 text-left transition-all hover:bg-blue-50/50",
        selected
          ? "border-blue-500 bg-blue-50 text-blue-700"
          : "border-border bg-card text-foreground"
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "h-5 w-5",
            selected ? "text-blue-600" : "text-muted-foreground"
          )}
        />
      )}
      <div>
        <div className="font-medium text-sm">{option.label}</div>
        {option.subtitle && (
          <div className="text-xs text-muted-foreground mt-0.5">
            {option.subtitle}
          </div>
        )}
      </div>
    </Button>
  );
}
