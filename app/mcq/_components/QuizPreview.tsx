"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionItem } from "../_lib/schema";
import { CheckCircle, Info } from "lucide-react";

interface QuizPreviewProps {
  questions: QuestionItem[];
}

export function QuizPreview({ questions }: QuizPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Preview Questions
          </span>
          <Badge variant="outline">{questions.length} Questions</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {questions.map((question, index) => (
            <AccordionItem key={index} value={`question-${index}`}>
              <AccordionTrigger className="hover:no-underline text-left">
                <div className="flex items-start gap-2">
                  <span className="font-medium">Q{index + 1}:</span>
                  <span className="text-sm">{question.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(question.options).map(([key, value]) => (
                    <div
                      key={key}
                      className={`p-3 rounded-md ${
                        key === question.answer
                          ? "bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800"
                          : "bg-slate-50 border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${
                            key === question.answer
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {key.toUpperCase()}
                        </div>
                        <span
                          className={
                            key === question.answer
                              ? "text-green-800 dark:text-green-200"
                              : "text-slate-700 dark:text-slate-300"
                          }
                        >
                          {value}
                          {key === question.answer && (
                            <span className="inline-flex items-center ml-2 text-green-600 dark:text-green-400">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              <span className="text-xs">Correct</span>
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {question.explanation && (
                  <div className="mt-4 text-sm p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                    <p className="font-medium mb-1">Explanation:</p>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
