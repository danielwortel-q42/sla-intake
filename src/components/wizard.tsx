"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { steps } from "@/lib/questions";
import { calculateScores, generateSummaryText } from "@/lib/scoring";
import type { Answers } from "@/lib/scoring";
import { QuestionGroup } from "./question-group";
import { ResultScreen } from "./result-screen";

export function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);

  const step = steps[currentStep];

  const handleAnswer = useCallback((key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleContextChange = useCallback((key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const stepComplete = step?.questions.every((q) => answers[q.key] !== undefined) ?? false;
  const isLastStep = currentStep === steps.length - 1;
  const progress = showResult ? 100 : ((currentStep + 1) / (steps.length + 1)) * 100;

  function handleNext() {
    if (isLastStep) setShowResult(true);
    else setCurrentStep((s) => s + 1);
  }

  function handleBack() {
    if (showResult) setShowResult(false);
    else setCurrentStep((s) => Math.max(0, s - 1));
  }

  function handleReset() {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
  }

  const result = showResult ? calculateScores(answers) : null;
  const summaryText = result ? generateSummaryText(answers, result, steps) : "";

  return (
    <Card className="w-full max-w-2xl shadow-sm">
      {/* Header */}
      <CardHeader className="pb-4 border-b">
        <CardTitle className="text-xl font-bold">SLA Intake Tool</CardTitle>
        <CardDescription>
          {showResult
            ? "Op basis van de antwoorden is onderstaand advies gegenereerd."
            : `Stap ${currentStep + 1} van ${steps.length} — ${step.title}`}
        </CardDescription>
        {/* Progress */}
        <div className="pt-3">
          <Progress value={progress} className="h-1.5" />
        </div>
      </CardHeader>

      <CardContent className="pt-6 pb-6">
        {showResult && result ? (
          <ResultScreen
            result={result}
            summaryText={summaryText}
            answers={answers}
            steps={steps}
            onBack={handleBack}
            onReset={handleReset}
          />
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-base font-semibold text-foreground">{step.subtitle}</h2>
            </div>

            <div className="space-y-6">
              {step.questions.map((q) => (
                <QuestionGroup
                  key={q.key}
                  question={q}
                  value={answers[q.key]}
                  contextValue={answers[`${q.key}_context`]}
                  onChange={handleAnswer}
                  onContextChange={handleContextChange}
                />
              ))}
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Vorige
              </Button>
              <Button onClick={handleNext} disabled={!stepComplete}>
                {isLastStep ? "Bekijk advies" : "Volgende"}
                {!isLastStep && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
