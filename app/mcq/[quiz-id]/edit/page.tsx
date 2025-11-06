"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { QuizCreationMethodSelector } from "../../_components/QuizCreationMethodSelector";
import { QuizForm } from "../../_components/quiz-form";
import { BreadcrumbNav } from "../../_components/breadcrumb-nav";
import { useQuizlet } from "../../_lib/quizlet-context";
import { QuestionItem } from "../../_lib/schema";

interface EditQuizPageProps {
  params: Promise<{
    "quiz-id": string;
  }>;
}

export default function EditQuizPage({ params }: EditQuizPageProps) {
  const resolvedParams = use(params);
  const quizId = resolvedParams["quiz-id"];
  const router = useRouter();
  const { toast } = useToast();
  const { getQuiz, updateQuiz, deleteQuiz, updateQuizQuestions } = useQuizlet();
  const [quiz, setQuiz] = useState(getQuiz(quizId));
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const loadedQuiz = getQuiz(quizId);
    if (!loadedQuiz) {
      toast({
        title: "Quiz not found",
        description: "The quiz you're looking for doesn't exist.",
        variant: "destructive",
      });
      router.push("/mcq");
    } else {
      setQuiz(loadedQuiz);
    }
  }, [quizId, getQuiz, router, toast]);

  if (!quiz) {
    return (
      <div className="container max-w-2xl py-10 px-4 sm:px-6">
        <BreadcrumbNav />
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Quiz not found. This quiz may have been deleted.
          </AlertDescription>
        </Alert>
        <div className="mt-6">
          <Button asChild>
            <Link href="/mcq">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Quizzes
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleDetailsSubmit = (values: {
    title: string;
    description?: string;
  }) => {
    updateQuiz(quizId, {
      title: values.title,
      description: values.description || "",
    });

    toast({
      title: "Quiz updated",
      description: "Your quiz details have been updated successfully.",
    });

    setQuiz((prev) => {
      if (!prev) return undefined;
      return { ...prev, title: values.title, description: values.description };
    });
  };

  const handleQuestionUpdate = (newQuestions: QuestionItem[]) => {
    updateQuizQuestions(quizId, newQuestions);

    toast({
      title: "Questions saved",
      description: `${newQuestions.length} questions have been saved successfully.`,
    });

    setQuiz((prev) => {
      if (!prev) return undefined;
      return { ...prev, questions: newQuestions };
    });
    setActiveTab("details");
  };

  return (
    <div className="container max-w-5xl py-10 px-4 sm:px-6">
      <BreadcrumbNav quizTitle={quiz.title} />
      <div className="space-y-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Edit Quiz
        </h1>

        <Tabs
          defaultValue="details"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Quiz Details</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="mt-0">
            <QuizForm
              initialValues={{
                title: quiz.title,
                description: quiz.description,
              }}
              onSubmit={handleDetailsSubmit}
              isEdit
            />
          </TabsContent>

          <TabsContent value="questions" className="mt-0">
            <QuizCreationMethodSelector
              onQuestionsChange={handleQuestionUpdate}
              existingQuestions={
                quiz.questions.length > 0 ? quiz.questions : undefined
              }
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
