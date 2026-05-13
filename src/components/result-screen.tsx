"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Shield,
  Activity,
  Copy,
  Check,
  RotateCcw,
  Package,
  ArrowLeft,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import type { ScoreResult, Answers } from "@/lib/scoring";
import type { Step } from "@/lib/questions";
import { cn } from "@/lib/utils";

interface ResultScreenProps {
  result: ScoreResult;
  summaryText: string;
  answers: Answers;
  steps: Step[];
  onBack: () => void;
  onReset: () => void;
}

const tierColors: Record<string, string> = {
  light: "bg-green-100 text-green-800 border-green-300",
  essential: "bg-blue-100 text-blue-800 border-blue-300",
  "essential-plus": "bg-purple-100 text-purple-800 border-purple-300",
};

export function ResultScreen({
  result,
  summaryText,
  answers,
  steps,
  onBack,
  onReset,
}: ResultScreenProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Tier advice */}
      <div className="text-center space-y-3">
        <Badge
          className={cn(
            "text-base px-4 py-1.5 font-semibold border",
            tierColors[result.tier]
          )}
        >
          {result.tierLabel}
        </Badge>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          {result.tierDescription}
        </p>
      </div>

      {/* Score boxes */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Business-risico</span>
            </div>
            <div className="text-2xl font-bold">{result.businessLabel}</div>
            <div className="text-xs text-muted-foreground">
              Score: {result.businessRisk}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Technische staat</span>
            </div>
            <div className="text-2xl font-bold">{result.techLabel}</div>
            <div className="text-xs text-muted-foreground">
              Score: {result.techRisk}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modules */}
      {result.modules.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Aanbevolen modules</span>
            </div>
            <ul className="space-y-2">
              {result.modules.map((mod) => (
                <li key={mod} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                  {mod}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Warnings */}
      {result.warnings.map((warning) => (
        <Alert key={warning} className="border-orange-300 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 text-sm">
            {warning}
          </AlertDescription>
        </Alert>
      ))}

      {/* Answer overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Overzicht antwoorden</span>
          </div>
          <div className="space-y-5">
            {steps.map((step) => (
              <div key={step.title}>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  {step.title}
                </div>
                <div className="space-y-2">
                  {step.questions.map((q) => {
                    const val = answers[q.key];
                    if (!val) return null;
                    const optLabel =
                      q.options.find((o) => o.value === val)?.label ?? val;
                    const ctx = answers[`${q.key}_context`];
                    return (
                      <div key={q.key} className="text-sm">
                        <span className="text-muted-foreground">
                          {q.label}
                        </span>
                        <div className="flex flex-wrap items-baseline gap-x-2 mt-0.5">
                          <span className="font-medium">{optLabel}</span>
                          {ctx && (
                            <span className="text-xs text-muted-foreground">
                              — {ctx}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <Button onClick={handleCopy} className="flex-1">
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Gekopieerd
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Kopieer samenvatting
            </>
          )}
        </Button>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Terug
        </Button>
        <Button variant="ghost" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Opnieuw
        </Button>
      </div>
    </div>
  );
}
