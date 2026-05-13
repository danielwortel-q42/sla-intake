"use client";

import type { Question } from "@/lib/questions";
import { CardOption } from "./card-option";
import { PillOption } from "./pill-option";

interface QuestionGroupProps {
  question: Question;
  value: string | undefined;
  contextValue: string | undefined;
  onChange: (key: string, value: string) => void;
  onContextChange: (key: string, value: string) => void;
}

export function QuestionGroup({
  question,
  value,
  contextValue,
  onChange,
  onContextChange,
}: QuestionGroupProps) {
  const showContext =
    question.contextField !== undefined &&
    value !== undefined &&
    question.contextField.triggerValues.includes(value);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        {question.label}
      </label>
      {question.type === "card" ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-medium text-muted-foreground">
            {question.contextField.label}
          </label>
          <textarea
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            rows={2}
            placeholder={question.contextField.placeholder}
            value={contextValue ?? ""}
            onChange={(e) =>
              onContextChange(`${question.key}_context`, e.target.value)
            }
          />
        </div>
      )}
    </div>
  );
}
