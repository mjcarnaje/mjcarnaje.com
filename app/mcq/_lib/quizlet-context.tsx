"use client";

import { nanoid } from "nanoid";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import defaultQuizData from "./default-questions.json";
import {
  PracticeModeConfig,
  Quiz,
  QuestionItem,
  QuizModeConfig,
} from "./schema";

interface QuizletState {
  quizzes: Quiz[];
  quizModeConfig: QuizModeConfig;
  practiceModeConfig: PracticeModeConfig;
}

interface QuizletContextType extends QuizletState {
  handleQuizModeConfigChange: (config: QuizModeConfig) => void;
  handlePracticeModeConfigChange: (config: PracticeModeConfig) => void;
  createQuiz: (quiz: Omit<Quiz, "id">) => string;
  updateQuiz: (id: string, quiz: Partial<Omit<Quiz, "id">>) => void;
  deleteQuiz: (id: string) => void;
  getQuiz: (id: string) => Quiz | undefined;
  updateQuizQuestions: (id: string, questions: QuestionItem[]) => void;
  saveChanges: () => void;
  resetToDefaults: () => void;
}

const LOCAL_STORAGE_KEY = "quizzes-data";

const QuizletContext = createContext<QuizletContextType | undefined>(undefined);

const createDefaultQuiz = (): Quiz => {
  return {
    id: nanoid(),
    title: defaultQuizData.title,
    description: defaultQuizData.description,
    questions: defaultQuizData.questions as QuestionItem[],
  };
};

export function QuizletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizletState>({
    quizzes: [createDefaultQuiz()],
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

  const createQuiz = (quiz: Omit<Quiz, "id">) => {
    const id = nanoid();
    const newQuiz: Quiz = {
      id,
      ...quiz,
    };

    setState((prevState) => ({
      ...prevState,
      quizzes: [...prevState.quizzes, newQuiz],
    }));

    return id;
  };

  const updateQuiz = (id: string, quiz: Partial<Omit<Quiz, "id">>) => {
    setState((prevState) => ({
      ...prevState,
      quizzes: prevState.quizzes.map((q) =>
        q.id === id ? { ...q, ...quiz } : q
      ),
    }));
  };

  const deleteQuiz = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      quizzes: prevState.quizzes.filter((q) => q.id !== id),
    }));
  };

  const getQuiz = (id: string) => {
    return state.quizzes.find((q) => q.id === id);
  };

  const updateQuizQuestions = (id: string, questions: QuestionItem[]) => {
    setState((prevState) => ({
      ...prevState,
      quizzes: prevState.quizzes.map((q) =>
        q.id === id ? { ...q, questions } : q
      ),
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
      quizzes: [createDefaultQuiz()],
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
        createQuiz,
        updateQuiz,
        deleteQuiz,
        getQuiz,
        updateQuizQuestions,
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
