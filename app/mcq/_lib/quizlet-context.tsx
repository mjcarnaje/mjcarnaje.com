"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import defaultQuestions from "./default-questions.json";
import { PracticeModeConfig, QuestionItem, QuizModeConfig } from "./schema";

interface QuizletState {
  questions: QuestionItem[];
  quizModeConfig: QuizModeConfig;
  practiceModeConfig: PracticeModeConfig;
}

interface QuizletContextType extends QuizletState {
  handleQuizModeConfigChange: (config: QuizModeConfig) => void;
  handlePracticeModeConfigChange: (config: PracticeModeConfig) => void;
  handleQuestionsChange: (questions: QuestionItem[]) => void;
  saveChanges: () => void;
  resetToDefaults: () => void;
}

const LOCAL_STORAGE_KEY = "quizlet-settings";

const QuizletContext = createContext<QuizletContextType | undefined>(undefined);

export function QuizletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizletState>({
    questions: defaultQuestions as QuestionItem[],
    quizModeConfig: {
      showConfetti: true,
      showAnswerImmediately: true,
      showAllQuestions: false,
      randomizeQuestions: true,
      randomizeOptions: true,
    },
    practiceModeConfig: {
      randomizeQuestions: true,
      showExplanationImmediately: true,
    },
  });

  // Load state from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedState) {
          const parsedState = JSON.parse(savedState) as QuizletState;
          setState(parsedState);
        }
      } catch (error) {
        console.error("Failed to load state from localStorage:", error);
      }
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save state to localStorage:", error);
      }
    }
  }, [state]);

  const handleQuizModeConfigChange = (config: QuizModeConfig) => {
    setState((prevState) => ({
      ...prevState,
      quizModeConfig: config,
    }));
  };

  const handlePracticeModeConfigChange = (config: PracticeModeConfig) => {
    setState((prevState) => ({
      ...prevState,
      practiceModeConfig: config,
    }));
  };

  const handleQuestionsChange = (questions: QuestionItem[]) => {
    setState((prevState) => ({
      ...prevState,
      questions: questions,
    }));
  };

  const saveChanges = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save state to localStorage:", error);
      }
    }
  };

  const resetToDefaults = () => {
    const defaultState: QuizletState = {
      questions: defaultQuestions as QuestionItem[],
      quizModeConfig: {
        showConfetti: true,
        showAnswerImmediately: true,
        showAllQuestions: false,
        randomizeQuestions: true,
        randomizeOptions: true,
      },
      practiceModeConfig: {
        randomizeQuestions: true,
        showExplanationImmediately: true,
      },
    };

    setState(defaultState);
  };

  return (
    <QuizletContext.Provider
      value={{
        ...state,
        handleQuizModeConfigChange,
        handlePracticeModeConfigChange,
        handleQuestionsChange,
        saveChanges,
        resetToDefaults,
      }}
    >
      {children}
    </QuizletContext.Provider>
  );
}

export function useQuizlet() {
  const context = useContext(QuizletContext);
  if (context === undefined) {
    throw new Error("useQuizlet must be used within a QuizletProvider");
  }
  return context;
}
