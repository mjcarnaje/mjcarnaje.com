"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { JsonEditor } from "./_lib/json-editor";
import { useQuizlet } from "./_lib/quizlet-context";

export const QuestionsForm = () => {
  const { handleQuestionsChange, questions } = useQuizlet();

  const [questionsJson, setQuestionsJson] = useState(() => {
    return JSON.stringify(questions, null, 2);
  });

  const [isValid, setIsValid] = useState(true);
  const [hasSettingsChanges, setHasSettingsChanges] = useState(false);

  // Update questionsJson when settings.questions changes
  useEffect(() => {
    setQuestionsJson(JSON.stringify(questions, null, 2));
  }, [questions]);

  const handleJsonChange = (
    value: string,
    valid: boolean,
    parsedValue?: any
  ) => {
    setQuestionsJson(value);
    setIsValid(valid);

    if (valid && parsedValue) {
      // Update local settings
      handleQuestionsChange(parsedValue);
      setHasSettingsChanges(true);
    }
  };

  const handleSave = () => {
    if (isValid) {
      handleQuestionsChange(questions);
      setHasSettingsChanges(false);
    }
  };

  const handleDiscard = () => {
    setQuestionsJson(JSON.stringify(questions, null, 2));
    setHasSettingsChanges(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          {hasSettingsChanges && (
            <div className="space-x-2">
              <Button variant="outline" onClick={handleDiscard}>
                Discard
              </Button>
              <Button onClick={handleSave} disabled={!isValid}>
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Questions</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Edit the JSON below to configure your quiz questions. Each question
            must include:
          </p>
          <pre className="mt-2 p-3 bg-slate-100 dark:bg-slate-900 rounded-md text-xs overflow-auto">
            {`[
  {
    "question": string,
    "options": {
      "a": string,
      "b": string,
      "c": string,
      "d": string
    },
    "answer": "a" | "b" | "c" | "d",
    "explanation": string (optional)
  },
  ...
]`}
          </pre>
        </div>

        <div className="mt-4">
          <JsonEditor
            initialValue={questionsJson}
            onChange={handleJsonChange}
          />
        </div>
      </div>

      <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
        <div
          className={`px-4 py-2 rounded-full ${
            isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isValid ? "Valid JSON" : "Invalid JSON"}
        </div>
      </div>

      {hasSettingsChanges && (
        <div className="fixed bottom-6 right-6 z-50 flex gap-2 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <Button variant="outline" onClick={handleDiscard}>
            Discard
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};
