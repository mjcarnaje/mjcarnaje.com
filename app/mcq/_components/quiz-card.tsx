import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, EyeIcon, MoreVertical, Pen, Trash } from "lucide-react";
import Link from "next/link";
import { Quiz } from "../_lib/schema";
import { useQuizlet } from "../_lib/quizlet-context";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface QuizCardProps {
  quiz: Quiz;
}

export function QuizCard({ quiz }: QuizCardProps) {
  const { deleteQuiz } = useQuizlet();
  const { toast } = useToast();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDelete = () => {
    deleteQuiz(quiz.id);
    toast({
      title: "Quiz deleted",
      description: "The quiz has been deleted successfully.",
    });
  };

  const copyQuestionsAsJson = () => {
    const jsonString = JSON.stringify(quiz.questions, null, 2);
    navigator.clipboard.writeText(jsonString);
    toast({
      title: "Copied to clipboard",
      description: "The quiz questions have been copied as JSON.",
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-none bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{quiz.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
              <MoreVertical className="h-4 w-4 text-slate-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/mcq/${quiz.id}/edit`}>
                  <Pen className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={copyQuestionsAsJson}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Questions as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteAlert(true)}>
                <Trash className="h-4 w-4 mr-2 text-destructive" />
                <span className="text-destructive">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {quiz.description && (
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {quiz.description}
          </p>
        )}
        <p className="text-sm text-slate-500 dark:text-slate-500">
          {quiz.questions.length} questions
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end pt-2">
        <Link
          href={`/mcq/${quiz.id}`}
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "gap-1.5",
          })}
        >
          <EyeIcon className="h-3.5 w-3.5" />
          View Quiz
        </Link>
      </CardFooter>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the quiz &quot;{quiz.title}&quot; and
              all its questions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
