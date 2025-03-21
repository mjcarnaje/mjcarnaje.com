"use client";

import { useState } from "react";
import { MCQItem, MCQItemSchema } from "./schema";
import { z } from "zod";

interface JsonEditorProps {
  initialValue: string;
  onChange: (value: string, isValid: boolean, parsedValue?: MCQItem[]) => void;
}

// Create a schema for an array of questions
const QuestionsArraySchema = z
  .array(MCQItemSchema)
  .min(1, "At least one question is required");

export const JsonEditor: React.FC<JsonEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    try {
      const parsedValue = JSON.parse(newValue);
      const result = QuestionsArraySchema.safeParse(parsedValue);

      if (result.success) {
        setError(null);
        onChange(newValue, true, result.data);
      } else {
        const errorMessage = result.error.errors
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join("\n");
        setError(errorMessage);
        onChange(newValue, false);
      }
    } catch (err) {
      setError("Invalid JSON format");
      onChange(newValue, false);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={handleChange}
        className="w-full min-h-[400px] p-3 font-mono text-sm bg-slate-800 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
      />
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 rounded-md text-red-700 text-sm">
          <p className="font-bold">Validation Error:</p>
          <pre className="whitespace-pre-wrap">{error}</pre>
        </div>
      )}
    </div>
  );
};
