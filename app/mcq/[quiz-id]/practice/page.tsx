"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PracticeQuiz from "../../_components/practice-quiz";
import { BreadcrumbNav } from "../../_components/breadcrumb-nav";
import { useQuizlet } from "../../_lib/quizlet-context";

interface EditQuizPageProps {
  params: {
    "quiz-id": string;
  };
}

export default function EditQuizPage({ params }: EditQuizPageProps) {
  const quizId = params["quiz-id"];
  const router = useRouter();
  const { toast } = useToast();
  const { getQuiz, practiceModeConfig, handlePracticeModeConfigChange } =
    useQuizlet();
  const [quiz, setQuiz] = useState(getQuiz(quizId));

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

  return (
    <>
      <div className="container max-w-6xl pt-10 px-4 sm:px-6">
        <BreadcrumbNav quizTitle={quiz.title} />
      </div>
      <PracticeQuiz
        questions={quiz.questions}
        practiceModeConfig={practiceModeConfig}
        handlePracticeModeConfigChange={handlePracticeModeConfigChange}
      />
    </>
  );
}
