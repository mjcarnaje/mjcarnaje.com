"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRightIcon,
  BookOpen,
  Brain,
  CheckCircle2,
  Lightbulb,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { QuizCreationMethodSelector } from "./_components/QuizCreationMethodSelector";
import { useQuizlet } from "./_lib/quizlet-context";
import { QuestionItem } from "./_lib/schema";

interface ModeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const ModeCard = ({ icon: Icon, title, description, href }: ModeCardProps) => (
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-none bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 h-full">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-lg font-bold">
        <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
          <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
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
          className: "w-full justify-between group",
        })}
      >
        Start {title}
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </CardFooter>
  </Card>
);

export default function Page() {
  const { toast } = useToast();
  const { handleQuestionsChange, questions } = useQuizlet();
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(
    questions.length > 0 ? true : null
  );

  const onQuestionsChange = (newQuestions: QuestionItem[]) => {
    handleQuestionsChange(newQuestions);
    setIsValid(true);
    setIsCreatingQuiz(false);
    toast({
      title: "Questions saved",
      description: `${newQuestions.length} questions have been saved successfully.`,
    });
  };

  return (
    <div className="container max-w-6xl py-10 px-4 sm:px-6">
      <div className="space-y-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Multiple Choice Question Quiz
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create and practice with your own set of multiple choice questions.
            Perfect for exam preparation and knowledge testing.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            variant={isCreatingQuiz ? "secondary" : "default"}
            className="gap-2"
            onClick={() => setIsCreatingQuiz(!isCreatingQuiz)}
          >
            {isCreatingQuiz
              ? "Cancel"
              : isValid === true && questions.length > 0
              ? "Edit Questions"
              : "Create Quiz"}
          </Button>
        </div>

        {isCreatingQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <QuizCreationMethodSelector
              onQuestionsChange={onQuestionsChange}
              existingQuestions={questions.length > 0 ? questions : undefined}
            />
          </motion.div>
        )}

        {isValid === false && !isCreatingQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive" className="border-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Invalid Question Format</AlertTitle>
              <AlertDescription>
                Please check your questions and try again. Each question must
                have the required format.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {isValid === true && questions.length > 0 && !isCreatingQuiz && (
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
                You have {questions.length} questions ready. Choose a mode below
                to begin your study session.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Select Study Mode
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                <ModeCard
                  icon={Sparkles}
                  title="Quiz Mode"
                  description="Test your knowledge with a quick assessment."
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

        {isValid === null && !isCreatingQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-6 py-10"
          >
            <div className="bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-100 dark:border-indigo-900 p-6 max-w-lg mx-auto">
              <Lightbulb className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                Get Started with MCQ Quiz
              </h3>
              <p className="text-indigo-600 dark:text-indigo-400 mb-6">
                Create your own custom quiz or import questions from a JSON file
                to begin practicing.
              </p>
              <Button
                onClick={() => setIsCreatingQuiz(true)}
                className="w-full justify-center"
              >
                Create Your First Quiz
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
