"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
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

  const stepComplete =
    step?.questions.every((q) => answers[q.key] !== undefined) ?? false;
  const isLastStep = currentStep === steps.length - 1;
  const progress = showResult
    ? 100
    : ((currentStep + 1) / (steps.length + 1)) * 100;

  function handleNext() {
    if (isLastStep) {
      setShowResult(true);
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (showResult) {
      setShowResult(false);
    } else {
      setCurrentStep((s) => Math.max(0, s - 1));
    }
  }

  function handleReset() {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
  }

  const result = showResult ? calculateScores(answers) : null;
  const summaryText = result
    ? generateSummaryText(answers, result, steps)
    : "";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <Progress value={progress} className="h-1.5" />
        {!showResult && (
          <div className="flex justify-between mt-2">
            {steps.map((s, i) => (
              <span
                key={s.title}
                className={`text-xs ${
                  i === currentStep
                    ? "text-foreground font-medium"
                    : i < currentStep
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                }`}
              >
                {i + 1}. {s.title}
              </span>
            ))}
          </div>
        )}
      </div>

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
            <h2 className="text-xl font-semibold">{step.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {step.subtitle}
            </p>
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

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
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
    </div>
  );
}
