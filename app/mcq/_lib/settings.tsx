"use client";

import { useState, useEffect } from "react";
import { MCQSettings, MCQSettingsSchema, MCQItem } from "./schema";
import { JsonEditor } from "./json-editor";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SettingsProps {
  settings: MCQSettings;
  settingsJson: string;
  onSettingsChange: (settings: MCQSettings) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  settings,
  settingsJson,
  onSettingsChange,
}) => {
  // Parse the existing settings to get just the questions for the JSON editor
  const [questionsJson, setQuestionsJson] = useState(() => {
    return JSON.stringify(settings.questions, null, 2);
  });
  const [isValid, setIsValid] = useState(true);

  // Update questionsJson when settings.questions changes (e.g., on initial load)
  useEffect(() => {
    setQuestionsJson(JSON.stringify(settings.questions, null, 2));
  }, [settings.questions]);

  const handleJsonChange = (
    value: string,
    valid: boolean,
    parsedValue?: any
  ) => {
    setQuestionsJson(value);
    setIsValid(valid);

    if (valid && parsedValue) {
      // Only update the questions array, not the entire settings
      onSettingsChange({
        ...settings,
        questions: parsedValue,
      });
    }
  };

  const handleSwitchChange = (setting: keyof MCQSettings) => {
    onSettingsChange({
      ...settings,
      [setting]: !settings[setting as keyof MCQSettings],
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>

        <div className="space-y-5 mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Show Confetti</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Show confetti animation when answer is correct
              </p>
            </div>
            <Switch
              checked={settings.showConfetti}
              onCheckedChange={() => handleSwitchChange("showConfetti")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">
                Show Answer Immediately
              </Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Show correct/incorrect feedback as soon as an option is selected
              </p>
            </div>
            <Switch
              checked={settings.showAnswerImmediately}
              onCheckedChange={() =>
                handleSwitchChange("showAnswerImmediately")
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">
                Show All Questions
              </Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Display all questions at once instead of one by one
              </p>
            </div>
            <Switch
              checked={settings.showAllQuestions}
              onCheckedChange={() => handleSwitchChange("showAllQuestions")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">
                Randomize Questions
              </Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Shuffle the order of questions for each attempt
              </p>
            </div>
            <Switch
              checked={settings.randomizeQuestions}
              onCheckedChange={() => handleSwitchChange("randomizeQuestions")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Randomize Options</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Shuffle the order of answer options for each question
              </p>
            </div>
            <Switch
              checked={settings.randomizeOptions}
              onCheckedChange={() => handleSwitchChange("randomizeOptions")}
            />
          </div>
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
    "id": number | string,
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
        <div>
          <h3 className="font-semibold">Current Settings</h3>
          <div className="mt-2 space-y-1 text-sm">
            <p>
              Show confetti:{" "}
              <span className="font-medium">
                {settings.showConfetti ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Show answer immediately:{" "}
              <span className="font-medium">
                {settings.showAnswerImmediately ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Show all questions:{" "}
              <span className="font-medium">
                {settings.showAllQuestions ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Randomize questions:{" "}
              <span className="font-medium">
                {settings.randomizeQuestions ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Randomize options:{" "}
              <span className="font-medium">
                {settings.randomizeOptions ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Number of questions:{" "}
              <span className="font-medium">{settings.questions.length}</span>
            </p>
          </div>
        </div>

        <div
          className={`px-4 py-2 rounded-full ${
            isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isValid ? "Valid JSON" : "Invalid JSON"}
        </div>
      </div>
    </div>
  );
};
