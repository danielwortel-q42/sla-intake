"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle, Shield, Activity, Copy, Check,
  RotateCcw, Package, ArrowLeft, ClipboardList,
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

const tierConfig: Record<string, { badge: string; label: string }> = {
  light:           { badge: "bg-green-100 text-green-800 border-green-300",  label: "bg-green-50  border-green-200" },
  essential:       { badge: "bg-blue-100  text-blue-800  border-blue-300",   label: "bg-blue-50   border-blue-200" },
  "essential-plus":{ badge: "bg-purple-100 text-purple-800 border-purple-300", label: "bg-purple-50 border-purple-200" },
};

export function ResultScreen({ result, summaryText, answers, steps, onBack, onReset }: ResultScreenProps) {
  const [copied, setCopied] = useState(false);
  const tier = tierConfig[result.tier];

  function handleCopy() {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">

      {/* Tier badge */}
      <div className={cn("rounded-lg border p-4 text-center space-y-2", tier.label)}>
        <Badge className={cn("text-sm px-3 py-1 font-semibold border", tier.badge)}>
          {result.tierLabel}
        </Badge>
        <p className="text-sm text-muted-foreground">{result.tierDescription}</p>
      </div>

      {/* Score boxes */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <Activity className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Business-risico</span>
            </div>
            <div className="text-xl font-bold">{result.businessLabel}</div>
            <div className="text-xs text-muted-foreground">Score: {result.businessRisk}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <Shield className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Technische staat</span>
            </div>
            <div className="text-xl font-bold">{result.techLabel}</div>
            <div className="text-xs text-muted-foreground">Score: {result.techRisk}</div>
          </CardContent>
        </Card>
      </div>

      {/* Modules */}
      {result.modules.length > 0 && (
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center gap-2 font-semibold">
              <Package className="h-4 w-4 text-muted-foreground" />
              Aanbevolen modules
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <ul className="space-y-1.5">
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
        <Alert key={warning} className="border-orange-300 bg-orange-50 py-3">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 text-sm">{warning}</AlertDescription>
        </Alert>
      ))}

      {/* Answer overview */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm flex items-center gap-2 font-semibold">
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
            Overzicht antwoorden
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.title}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  {step.title}
                </p>
                <div className="space-y-2 pl-0.5">
                  {step.questions.map((q) => {
                    const val = answers[q.key];
                    if (!val) return null;
                    const optLabel = q.options.find((o) => o.value === val)?.label ?? val;
                    const ctx = answers[`${q.key}_context`];
                    return (
                      <div key={q.key} className="text-sm">
                        <span className="text-muted-foreground text-xs">{q.label}</span>
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <span className="font-medium">{optLabel}</span>
                          {ctx && <span className="text-xs text-muted-foreground">— {ctx}</span>}
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

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button onClick={handleCopy} className="flex-1">
          {copied
            ? <><Check className="h-4 w-4 mr-2" />Gekopieerd</>
            : <><Copy className="h-4 w-4 mr-2" />Kopieer samenvatting</>}
        </Button>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Terug
        </Button>
        <Button variant="ghost" size="icon" onClick={onReset} title="Opnieuw starten">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
