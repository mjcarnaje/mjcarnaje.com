"use client";

import { Button } from "@/components/ui/button";
import { QuizForm } from "./QuizForm";
import { QuestionItem } from "../_lib/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuizJSONForm } from "./QuizJSONForm";
import { useState } from "react";
import { Code } from "lucide-react";

interface QuizCreationMethodSelectorProps {
  onQuestionsChange: (questions: QuestionItem[]) => void;
  existingQuestions?: QuestionItem[];
}

export function QuizCreationMethodSelector({
  onQuestionsChange,
  existingQuestions,
}: QuizCreationMethodSelectorProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Code className="h-4 w-4" />
              Modify Questions via JSON
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Modify Questions via JSON
              </DialogTitle>
              <DialogDescription>
                Insert your JSON array of questions below. Ensure each question
                adheres to the specified format.
              </DialogDescription>
            </DialogHeader>
            <QuizJSONForm
              onSave={(questions: QuestionItem[]) => {
                onQuestionsChange(questions);
                setDialogOpen(false);
              }}
              existingQuestions={existingQuestions}
            />
          </DialogContent>
        </Dialog>
      </div>

      <QuizForm
        onQuestionsSubmit={onQuestionsChange}
        existingQuestions={existingQuestions}
      />
    </div>
  );
}
