"use client";

import type { Question } from "@/lib/questions";
import { CardOption } from "./card-option";
import { PillOption } from "./pill-option";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface QuestionGroupProps {
  question: Question;
  value: string | undefined;
  contextValue: string | undefined;
  onChange: (key: string, value: string) => void;
  onContextChange: (key: string, value: string) => void;
}

export function QuestionGroup({ question, value, contextValue, onChange, onContextChange }: QuestionGroupProps) {
  const showContext =
    question.contextField !== undefined &&
    value !== undefined &&
    question.contextField.triggerValues.includes(value);

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">{question.label}</p>

      {question.type === "card" ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {question.options.map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={value === opt.value}
              onSelect={() => onChange(question.key, opt.value)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {question.options.map((opt) => (
            <PillOption
              key={opt.value}
              option={opt}
              selected={value === opt.value}
              onSelect={() => onChange(question.key, opt.value)}
            />
          ))}
        </div>
      )}

      {showContext && question.contextField && (
        <div className="space-y-1.5 pl-1">
          <Label htmlFor={`${question.key}-context`} className="text-xs text-muted-foreground font-normal">
            {question.contextField.label}
          </Label>
          <Textarea
            id={`${question.key}-context`}
            rows={2}
            placeholder={question.contextField.placeholder}
            value={contextValue ?? ""}
            onChange={(e) => onContextChange(`${question.key}_context`, e.target.value)}
            className="text-sm resize-none"
          />
        </div>
      )}
    </div>
  );
}
