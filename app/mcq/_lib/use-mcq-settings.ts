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

  return {
    settings,
    setSettings,
    isLoaded,
    settingsJson: JSON.stringify(settings, null, 2),
    updateSettings: (newSettings: MCQSettings) => {
      setSettings(newSettings);
    },
  };
}
