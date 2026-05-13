"use client";

import type { Question } from "@/lib/questions";
import { CardOption } from "./card-option";
import { PillOption } from "./pill-option";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
    <Card className="space-y-3">
      <CardHeader className="px-4 pb-0">
        <CardTitle className="text-sm text-foreground">
          {question.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pt-0">
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
            <Label
              htmlFor={`${question.key}-context`}
              className="text-xs text-muted-foreground"
            >
              {question.contextField.label}
            </Label>
            <Textarea
              id={`${question.key}-context`}
              rows={2}
              placeholder={question.contextField.placeholder}
              value={contextValue ?? ""}
              onChange={(e) =>
                onContextChange(`${question.key}_context`, e.target.value)
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
