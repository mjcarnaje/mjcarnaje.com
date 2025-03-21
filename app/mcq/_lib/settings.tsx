"use client";

import { useState, useEffect } from "react";
import { JsonEditor } from "./json-editor";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMCQ } from "./MCQContext";

export const Settings = () => {
  const {
    rawSettings,
    settingsJson,
    localSettings,
    setLocalSettings,
    updateSettings,
    hasSettingsChanges,
    setHasSettingsChanges,
    resetQuiz,
  } = useMCQ();

  // Parse the existing settings to get just the questions for the JSON editor
  const [questionsJson, setQuestionsJson] = useState(() => {
    return JSON.stringify(rawSettings.questions, null, 2);
  });
  const [isValid, setIsValid] = useState(true);

  // Update questionsJson when settings.questions changes
  useEffect(() => {
    setQuestionsJson(JSON.stringify(rawSettings.questions, null, 2));
  }, [rawSettings.questions]);

  const handleJsonChange = (
    value: string,
    valid: boolean,
    parsedValue?: any
  ) => {
    setQuestionsJson(value);
    setIsValid(valid);

    if (valid && parsedValue) {
      // Update local settings
      setLocalSettings({
        ...localSettings,
        questions: parsedValue,
      });
      setHasSettingsChanges(true);
    }
  };

  const handleSwitchChange = (setting: keyof typeof localSettings) => {
    setLocalSettings({
      ...localSettings,
      [setting]: !localSettings[setting as keyof typeof localSettings],
    });
    setHasSettingsChanges(true);
  };

  const handleSave = () => {
    if (isValid) {
      updateSettings(localSettings);
    }
  };

  const handleDiscard = () => {
    setLocalSettings(rawSettings);
    setQuestionsJson(JSON.stringify(rawSettings.questions, null, 2));
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

        <div className="space-y-5 mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Show Confetti</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Show confetti animation when answer is correct
              </p>
            </div>
            <Switch
              checked={localSettings.showConfetti}
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
              checked={localSettings.showAnswerImmediately}
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
              checked={localSettings.showAllQuestions}
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
              checked={localSettings.randomizeQuestions}
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
              checked={localSettings.randomizeOptions}
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
                {rawSettings.showConfetti ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Show answer immediately:{" "}
              <span className="font-medium">
                {rawSettings.showAnswerImmediately ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Show all questions:{" "}
              <span className="font-medium">
                {rawSettings.showAllQuestions ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Randomize questions:{" "}
              <span className="font-medium">
                {rawSettings.randomizeQuestions ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Randomize options:{" "}
              <span className="font-medium">
                {rawSettings.randomizeOptions ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Number of questions:{" "}
              <span className="font-medium">
                {rawSettings.questions.length}
              </span>
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
