"use client";

import { useState, useEffect } from "react";
import {
  MCQSettings,
  MCQSettingsSchema,
  defaultSettings,
  MCQItem,
} from "./schema";
import { defaultMCQ } from "./default-mcq";

const LOCAL_STORAGE_KEY = "mcq-settings";

// Fisher-Yates shuffle algorithm for arrays
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function shuffleOptions(question: MCQItem): MCQItem {
  const optionEntries = Object.entries(question.options); // [key, value]
  const shuffled = shuffleArray(optionEntries); // Shuffle [key, value] pairs

  const newKeys: ("a" | "b" | "c" | "d")[] = ["a", "b", "c", "d"];
  const shuffledOptions: Record<"a" | "b" | "c" | "d", string> = {} as any;

  let newAnswer: "a" | "b" | "c" | "d" = "a";

  shuffled.forEach(([originalKey, value], index) => {
    const newKey = newKeys[index];
    shuffledOptions[newKey] = value;
    if (originalKey === question.answer) {
      newAnswer = newKey;
    }
  });

  return {
    ...question,
    options: shuffledOptions,
    answer: newAnswer,
  };
}

export function useMCQSettings() {
  const [settings, setSettings] = useState<MCQSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Process default MCQ to ensure it matches our schema
  const processedDefaultMCQ = defaultMCQ.map((item) => ({
    ...item,
    answer: item.answer as "a" | "b" | "c" | "d",
  })) as MCQItem[];

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        const result = MCQSettingsSchema.safeParse(parsedSettings);

        if (result.success) {
          setSettings(result.data);
        } else {
          // If validation fails, use default settings with default questions
          setSettings({
            ...defaultSettings,
            questions: processedDefaultMCQ,
          });
        }
      } else {
        // If no saved settings, use default settings with default questions
        setSettings({
          ...defaultSettings,
          questions: processedDefaultMCQ,
        });
      }
    } catch (error) {
      console.error("Error loading settings from localStorage:", error);
      // Fallback to default settings
      setSettings({
        ...defaultSettings,
        questions: processedDefaultMCQ,
      });
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  // Apply randomization to questions and options if enabled
  const getProcessedSettings = (): MCQSettings => {
    let processedQuestions = [...settings.questions];

    // Randomize questions if the setting is enabled
    if (settings.randomizeQuestions) {
      processedQuestions = shuffleArray(processedQuestions);
    }

    // Randomize options if the setting is enabled
    if (settings.randomizeOptions) {
      processedQuestions = processedQuestions.map(shuffleOptions);
    }

    return {
      ...settings,
      questions: processedQuestions,
    };
  };

  return {
    settings: getProcessedSettings(),
    rawSettings: settings, // Original unshuffled settings
    setSettings,
    isLoaded,
    settingsJson: JSON.stringify(settings, null, 2),
    updateSettings: (newSettings: MCQSettings) => {
      setSettings(newSettings);
    },
  };
}
