import { z } from "zod";

export const QuestionOptionSchema = z.object({
  a: z.string().min(1, "Option A is required"),
  b: z.string().min(1, "Option B is required"),
  c: z.string().min(1, "Option C is required"),
  d: z.string().min(1, "Option D is required"),
});

export const QuestionItemSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: QuestionOptionSchema,
  answer: z.enum(["a", "b", "c", "d"]),
  explanation: z.string().optional(),
});

export const quizletSchema = z.object({
  questions: z
    .array(QuestionItemSchema)
    .min(1, "At least one question is required"),
});

export const quizModeConfigSchema = z.object({
  showConfetti: z.boolean().default(true),
  showAnswerImmediately: z.boolean().default(true),
  showAllQuestions: z.boolean().default(false),
  randomizeQuestions: z.boolean().default(true),
  randomizeOptions: z.boolean().default(true),
});

export const practiceModeConfigSchema = z.object({
  randomizeQuestions: z.boolean().default(true),
  showExplanationImmediately: z.boolean().default(true),
});

export type Quizlet = z.infer<typeof quizletSchema>;

export type QuestionItem = z.infer<typeof QuestionItemSchema>;
export type QuestionOption = z.infer<typeof QuestionOptionSchema>;

export type QuizModeConfig = z.infer<typeof quizModeConfigSchema>;
export type PracticeModeConfig = z.infer<typeof practiceModeConfigSchema>;

export const quizModeConfig: QuizModeConfig = {
  showConfetti: true,
  showAnswerImmediately: true,
  showAllQuestions: false,
  randomizeQuestions: true,
  randomizeOptions: true,
};

export const practiceModeConfig: PracticeModeConfig = {
  randomizeQuestions: true,
  showExplanationImmediately: true,
};
