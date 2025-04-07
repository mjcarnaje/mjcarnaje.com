"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QuizCard } from "./_components/quiz-card";
import { BreadcrumbNav } from "./_components/breadcrumb-nav";
import { useQuizlet } from "./_lib/quizlet-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { QuizForm } from "./_components/quiz-form";

export default function Page() {
  const { quizzes, createQuiz } = useQuizlet();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSubmit = (values: { title: string; description?: string }) => {
    const quizId = createQuiz({
      title: values.title,
      description: values.description || "",
      questions: [],
    });

    toast({
      title: "Quiz created",
      description:
        "Your quiz has been created successfully. Now add some questions!",
    });

    setOpen(false);
    router.push(`/mcq/${quizId}/edit`);
  };

  return (
    <div className="container max-w-6xl py-10 px-4 sm:px-6">
      <BreadcrumbNav showBackButton={false} />
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Quiz Collection
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Create and practice with multiple choice questions. Perfect for
              exam preparation.
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1.5">
                <PlusIcon className="h-4 w-4" />
                New Quiz
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Quiz</DialogTitle>
                <DialogDescription>
                  Create a new quiz by filling out the form below. You can add
                  questions in the next step.
                </DialogDescription>
              </DialogHeader>
              <QuizForm onSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>
        </div>

        {quizzes.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">
              No Quizzes Yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Create your first quiz to get started with practicing multiple
              choice questions.
            </p>
            <Button onClick={() => setOpen(true)}>
              Create Your First Quiz
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
