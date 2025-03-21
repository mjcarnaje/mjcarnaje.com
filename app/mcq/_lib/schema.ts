import { z } from "zod";

export const MCQOptionSchema = z.object({
  a: z.string().min(1, "Option A is required"),
  b: z.string().min(1, "Option B is required"),
  c: z.string().min(1, "Option C is required"),
  d: z.string().min(1, "Option D is required"),
});

export const MCQItemSchema = z.object({
  id: z.number().or(z.string()),
  question: z.string().min(1, "Question is required"),
  options: MCQOptionSchema,
  answer: z.enum(["a", "b", "c", "d"]),
  explanation: z.string().optional(),
});

export const MCQSettingsSchema = z.object({
  showConfetti: z.boolean().default(true),
  showAnswerImmediately: z.boolean().default(true),
  showAllQuestions: z.boolean().default(true),
  questions: z.array(MCQItemSchema).min(1, "At least one question is required"),
});

export type MCQSettings = z.infer<typeof MCQSettingsSchema>;
export type MCQItem = z.infer<typeof MCQItemSchema>;
export type MCQOption = z.infer<typeof MCQOptionSchema>;

export const defaultSettings: MCQSettings = {
  showConfetti: true,
  showAnswerImmediately: true,
  showAllQuestions: true,
  questions: [],
};
