"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { HelpCircle, Pencil, PlusCircle, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { QuestionItem } from "../_lib/schema";
import { QuizPreview } from "./QuizPreview";

const formSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        options: z.object({
          a: z.string().min(1, "Option A is required"),
          b: z.string().min(1, "Option B is required"),
          c: z.string().min(1, "Option C is required"),
          d: z.string().min(1, "Option D is required"),
        }),
        answer: z.enum(["a", "b", "c", "d"]),
        explanation: z.string().optional(),
      })
    )
    .min(1, "At least one question is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface QuizFormProps {
  onQuestionsSubmit: (questions: QuestionItem[]) => void;
  existingQuestions?: QuestionItem[];
}

export function QuizForm({
  onQuestionsSubmit,
  existingQuestions,
}: QuizFormProps) {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions: existingQuestions?.length
        ? existingQuestions
        : [
            {
              question: "",
              options: {
                a: "",
                b: "",
                c: "",
                d: "",
              },
              answer: "a",
              explanation: "",
            },
          ],
    },
  });

  // Set up field array for questions
  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  // Function to handle form submission
  const onSubmit = (data: FormValues) => {
    onQuestionsSubmit(data.questions);
    toast({
      title: "Questions saved",
      description: `${data.questions.length} questions have been saved.`,
    });
  };

  // Add new question
  const addQuestion = () => {
    append({
      question: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "a",
      explanation: "",
    });
  };

  return (
    <div className="space-y-6">
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Questions</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addQuestion}
                  className="gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Question
                </Button>
              </div>

              <Accordion type="multiple" className="w-full space-y-4">
                {fields.map((field, index) => (
                  <AccordionItem
                    key={field.id}
                    value={`question-${index}`}
                    className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline bg-slate-50 dark:bg-slate-900">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            Question {index + 1}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 text-sm truncate max-w-[240px]">
                            {form.watch(`questions.${index}.question`) ||
                              "(No question text)"}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-auto mr-2 h-8 w-8 p-0 text-red-600 dark:text-red-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (fields.length > 1) {
                              remove(index);
                            } else {
                              toast({
                                variant: "destructive",
                                title: "Cannot remove",
                                description: "You need at least one question.",
                              });
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-white dark:bg-slate-950">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`questions.${index}.question`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Question</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter your question"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {["a", "b", "c", "d"].map((option) => (
                            <FormField
                              key={option}
                              control={form.control}
                              name={`questions.${index}.options.${
                                option as "a" | "b" | "c" | "d"
                              }`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-1">
                                    Option {option.toUpperCase()}
                                    {form.watch(`questions.${index}.answer`) ===
                                      option && (
                                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                        (Correct)
                                      </span>
                                    )}
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={`Option ${option.toUpperCase()}`}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>

                        <FormField
                          control={form.control}
                          name={`questions.${index}.answer`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Correct Answer</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select correct answer" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="a">Option A</SelectItem>
                                  <SelectItem value="b">Option B</SelectItem>
                                  <SelectItem value="c">Option C</SelectItem>
                                  <SelectItem value="d">Option D</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`questions.${index}.explanation`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-1">
                                Explanation{" "}
                                <span className="text-xs text-slate-500">
                                  (Optional)
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Explain why this answer is correct"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                This will be shown to users after answering the
                                question
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {fields.length === 0 && (
                <div className="text-center p-8 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                  <HelpCircle className="h-12 w-12 mx-auto text-slate-400" />
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    No questions added yet. Click &quot;Add Question&quot; to
                    get started.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                {showPreview ? "Edit Questions" : "Preview Quiz"}
              </Button>
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                Save Quiz
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>

      {showPreview && form.getValues().questions.length > 0 && (
        <div className="mt-8">
          <QuizPreview questions={form.getValues().questions} />
        </div>
      )}
    </div>
  );
}
