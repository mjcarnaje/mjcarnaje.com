"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  AlertCircle,
  BookOpen,
  Brain,
  CheckCircle2,
  Code,
  Lightbulb,
  Loader2,
  LucideIcon,
  Sparkles,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuizlet } from "./_lib/quizlet-context";
import { QuestionItem } from "./_lib/schema";
import { useToast } from "@/hooks/use-toast";

interface ModeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const ModeCard = ({ icon: Icon, title, description, href }: ModeCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-lg">
        <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-slate-600 dark:text-slate-400 text-sm">
        {description}
      </p>
    </CardContent>
    <CardFooter className="pt-2">
      <Link
        href={href}
        className={buttonVariants({
          variant: "default",
          className: "w-full justify-center",
        })}
      >
        Start {title}
      </Link>
    </CardFooter>
  </Card>
);

export default function Page() {
  const { toast } = useToast();

  const { handleQuestionsChange, questions } = useQuizlet();
  const [jsonInput, setJsonInput] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validatedQuestions, setValidatedQuestions] = useState<
    QuestionItem[] | null
  >(null);

  useEffect(() => {
    setJsonInput(JSON.stringify(questions, null, 2));
    setIsValid(true);
    setValidatedQuestions(questions);
  }, [questions]);

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

        // Basic validation for question format
        const valid = parsed.every(
          (item) =>
            typeof item === "object" &&
            item !== null &&
            "question" in item &&
            "options" in item &&
            "answer" in item &&
            typeof item.options === "object" &&
            "a" in item.options &&
            "b" in item.options &&
            "c" in item.options &&
            "d" in item.options &&
            ["a", "b", "c", "d"].includes(item.answer)
        );

        if (valid) {
          setIsValid(true);
          setValidatedQuestions(parsed);
          handleQuestionsChange(parsed);
        } else {
          setIsValid(false);
        }
      } catch (e) {
        setIsValid(false);
      }
      setIsValidating(false);
    }, 500); // Add a slight delay for better UX
  };

  return (
    <div className="container max-w-5xl py-10 px-4 sm:px-6">
      <div className="space-y-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Multiple Choice Question Quiz
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create and practice with your own set of multiple choice questions.
            Perfect for exam preparation and knowledge testing.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="chatgpt-tip"
          className="bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-100 dark:border-indigo-900"
        >
          <AccordionItem value="chatgpt-tip" className="border-b-0">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">
                  Generate Questions with ChatGPT
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Use this prompt template with ChatGPT to generate questions in
                  the correct format:
                </p>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <pre className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                      {`Create a set of 50 multiple choice questions.

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

Each question should have exactly 4 options labeled a, b, c, and d. The "answer" field must contain only the letter of the correct option. Strive to craft challenging questions with plausible distractors to enhance the learning experience.`}
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2"
                      onClick={() => {
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
                <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p>
                    For better results, specify the difficulty level, ask for
                    specific topics, or request questions that test different
                    cognitive levels (recall, application, analysis).
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Input Questions JSON
            </CardTitle>
            <CardDescription>
              Paste your JSON array of questions below. Each question must
              follow the required format.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Enter your JSON formatted questions here..."
              className="min-h-[300px] font-mono text-sm resize-y"
              value={jsonInput}
              onChange={(e) => {
                setJsonInput(e.target.value);
                setIsValid(null);
              }}
            />
          </CardContent>
          <CardFooter className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
            <div className="flex justify-between items-center w-full">
              <div>
                {isValid === true && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Valid
                  </Badge>
                )}
                {isValid === false && (
                  <Badge variant="destructive">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Invalid
                  </Badge>
                )}
              </div>
              <Button
                onClick={validateJson}
                className="relative"
                disabled={isValidating}
              >
                {isValidating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  "Validate JSON"
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>

        {isValid === false && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive" className="border-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Invalid JSON Format</AlertTitle>
              <AlertDescription>
                Please check your input. It should be a valid JSON array of
                question objects with the required format.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {isValid === true && validatedQuestions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <Alert className="border-green-300 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Successfully validated {validatedQuestions.length} questions.
                Choose a mode below to begin your study session.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Select Study Mode
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <ModeCard
                  icon={Timer}
                  title="Quiz Mode"
                  description="Challenge yourself with a timed assessment to test your knowledge."
                  href="/mcq/quiz"
                />

                <ModeCard
                  icon={BookOpen}
                  title="Practice Mode"
                  description="Learn at your own pace with immediate feedback after each question."
                  href="/mcq/practice"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
