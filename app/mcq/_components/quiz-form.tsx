import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QuizSchema } from "../_lib/schema";

const formSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface QuizFormProps {
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  isEdit?: boolean;
}

export function QuizForm({
  initialValues,
  onSubmit,
  isEdit = false,
}: QuizFormProps) {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      title: "",
      description: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title for your quiz" {...field} />
              </FormControl>
              <FormDescription>
                This will be the main title displayed for your quiz.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a description for your quiz"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormDescription>
                Provide additional context or instructions for quiz takers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? "Update Quiz" : "Create Quiz"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
