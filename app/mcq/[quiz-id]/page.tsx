"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainIcon,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useQuizlet } from "../_lib/quizlet-context";
import { BreadcrumbNav } from "../_components/breadcrumb-nav";

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
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </CardFooter>
  </Card>
);

interface ViewQuizPageProps {
  params: Promise<{
    "quiz-id": string;
  }>;
}

export default function ViewQuizPage({ params }: ViewQuizPageProps) {
  const resolvedParams = use(params);
  const quizId = resolvedParams["quiz-id"];
  const router = useRouter();
  const { toast } = useToast();
  const { getQuiz } = useQuizlet();
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
    <div className="container max-w-6xl py-10 px-4 sm:px-6">
      <BreadcrumbNav quizTitle={quiz.title} />
      <div className="space-y-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {quiz.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {quiz.description}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BrainIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Select Study Mode
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <ModeCard
                icon={Sparkles}
                title="Quiz Mode"
                description="Test your knowledge with a quick assessment."
                href={`/mcq/${quizId}/quiz`}
              />

              <ModeCard
                icon={BookOpen}
                title="Practice Mode"
                description="Learn at your own pace with immediate feedback after each question."
                href={`/mcq/${quizId}/practice`}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
