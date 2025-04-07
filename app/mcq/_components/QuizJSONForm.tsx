"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Lightbulb, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { QuestionItem, QuestionItemSchema } from "../_lib/schema";

interface QuizJSONFormProps {
  onSave: (questions: QuestionItem[]) => void;
  existingQuestions?: QuestionItem[];
}

export function QuizJSONForm({ onSave, existingQuestions }: QuizJSONFormProps) {
  const { toast } = useToast();
  const [jsonInput, setJsonInput] = useState(
    existingQuestions ? JSON.stringify(existingQuestions, null, 2) : ""
  );
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateJson = () => {
    setIsValidating(true);
    setTimeout(() => {
      try {
        const parsed = JSON.parse(jsonInput);

        if (!Array.isArray(parsed)) {
          setIsValid(false);
          setIsValidating(false);
          return;
        }

        // Define array schema
        const arraySchema = z.array(QuestionItemSchema);

        // Validate
        const result = arraySchema.safeParse(parsed);

        if (result.success) {
          setIsValid(true);
          onSave(result.data);
          toast({
            title: "Success!",
            description: `Successfully validated ${result.data.length} questions.`,
          });
        } else {
          console.error("Validation errors:", result.error);
          setIsValid(false);
          toast({
            variant: "destructive",
            title: "Invalid JSON format",
            description:
              "The JSON structure doesn't match the required format.",
          });
        }
      } catch (e) {
        console.error("JSON parse error:", e);
        setIsValid(false);
        toast({
          variant: "destructive",
          title: "Invalid JSON",
          description: "Please check your JSON syntax.",
        });
      }
      setIsValidating(false);
    }, 500);
  };

  const promptText = `Create a set of 50 multiple choice questions.

Feel free to include any specific notes or subtopics you wish to cover:

[INSERT YOUR NOTES OR TOPIC HERE]

Make sure the output is a valid JSON array structured as follows:

[
  {
    "question": "Type your question text here?",
    "options": {
      "a": "Text for Option A",
      "b": "Text for Option B",
      "c": "Text for Option C",
      "d": "Text for Option D"
    },
    "answer": "a",
    "explanation": "Provide a comprehensive explanation for the correct answer"
  }
]

Each question should have exactly 4 options labeled a, b, c, and d. The "answer" field must contain only the letter of the correct option. Strive to craft challenging questions with plausible distractors to enhance the learning experience.`;

  return (
    <div className="space-y-4 mt-4">
      <Accordion
        type="single"
        collapsible
        className="bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-100 dark:border-indigo-900 mb-4"
      >
        <AccordionItem value="chatgpt-tip" className="border-b-0">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium text-sm">
                Generate Questions with ChatGPT
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Use this prompt template with ChatGPT to generate questions in
                the correct format:
              </p>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-md border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-start mb-2">
                  <pre className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap overflow-auto max-h-40">
                    {promptText}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 flex-shrink-0"
                    onClick={() => {
                      navigator.clipboard.writeText(promptText);
                      toast({
                        title: "Prompt copied to clipboard",
                        description: "You can now paste it into ChatGPT",
                      });
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <Lightbulb className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
                <p>
                  For better results, specify the difficulty level, ask for
                  specific topics, or request questions that test different
                  cognitive levels.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Textarea
        placeholder="Enter your JSON formatted questions here..."
        className="min-h-[200px] font-mono text-sm resize-y"
        value={jsonInput}
        onChange={(e) => {
          setJsonInput(e.target.value);
          setIsValid(null);
        }}
      />

      {isValid === false && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Invalid JSON Format</AlertTitle>
          <AlertDescription>
            Please check your input. It should be a valid JSON array of question
            objects with the required format.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end gap-2 mt-4">
        <Button
          onClick={validateJson}
          className="w-full sm:w-auto"
          disabled={isValidating}
        >
          {isValidating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Validating...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}
