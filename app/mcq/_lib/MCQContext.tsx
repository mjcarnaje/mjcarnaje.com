"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { defaultMCQ } from "./default-mcq";
import {
  defaultSettings,
  MCQItem,
  MCQSettings,
  MCQSettingsSchema,
} from "./schema";

// Fisher-Yates shuffle algorithm for arrays
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to shuffle options while preserving the answer key
function shuffleOptions(question: MCQItem): MCQItem {
  const entries = Object.entries(question.options);
  const shuffledEntries = shuffleArray(entries);

  // Create a map from old keys to new keys
  const keyMap: Record<string, string> = {};
  entries.forEach(([oldKey], index) => {
    keyMap[oldKey] = String.fromCharCode(97 + index); // 'a', 'b', 'c', 'd'
  });

  // Create new options object with shuffled values
  const newOptions = {
    a: "",
    b: "",
    c: "",
    d: "",
  };

  // Assign shuffled values to fixed keys a, b, c, d
  shuffledEntries.forEach(([oldKey, value], index) => {
    const newKey = String.fromCharCode(97 + index); // 'a', 'b', 'c', 'd'
    newOptions[newKey as keyof typeof newOptions] = value;
    keyMap[oldKey] = newKey; // Update the key mapping
  });

  // Update the answer key to match the new position
  const newAnswer = keyMap[question.answer];

  return {
    ...question,
    options: newOptions,
    answer: newAnswer as "a" | "b" | "c" | "d",
  };
}

interface QuizState {
  currentQuestionIndex: number;
  selectedOptions: Record<number, string | null>;
  submittedQuestions: number[];
  questions: MCQItem[];
}

interface MCQContextType {
  settings: MCQSettings;
  rawSettings: MCQSettings;
  settingsJson: string;
  isLoaded: boolean;
  hasSettingsChanges: boolean;
  setHasSettingsChanges: (value: boolean) => void;
  localSettings: MCQSettings;
  setLocalSettings: (settings: MCQSettings) => void;
  updateSettings: (settings: MCQSettings) => void;
  resetQuiz: () => void;
  currentQuestionIndex: number;
  selectedOptions: Record<number, string | null>;
  submittedQuestions: Set<number>;
  setCurrentQuestionIndex: (index: number) => void;
  setSelectedOptions: (options: Record<number, string | null>) => void;
  setSubmittedQuestions: (submitted: Set<number>) => void;
  quizQuestions: MCQItem[];
  setQuizQuestions: (questions: MCQItem[]) => void;
}

const LOCAL_STORAGE_KEY = "mcq-settings";
const QUIZ_STATE_KEY = "mcq_state";

const MCQContext = createContext<MCQContextType | undefined>(undefined);

export function MCQProvider({ children }: { children: ReactNode }) {
  // Settings state
  const [rawSettings, setRawSettings] = useState<MCQSettings>(defaultSettings);
  const [localSettings, setLocalSettings] =
    useState<MCQSettings>(defaultSettings);
  const [hasSettingsChanges, setHasSettingsChanges] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string | null>
  >({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Set<number>>(
    new Set()
  );
  const [quizQuestions, setQuizQuestions] = useState<MCQItem[]>([]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const processedDefaultMCQ = defaultMCQ.map((item) => ({
      ...item,
      answer: item.answer as "a" | "b" | "c" | "d",
    })) as MCQItem[];

    try {
      const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        const result = MCQSettingsSchema.safeParse(parsedSettings);

        if (result.success) {
          // If questions array is empty, add default questions
          const finalSettings = {
            ...result.data,
            questions:
              result.data.questions.length > 0
                ? result.data.questions
                : processedDefaultMCQ,
          };
          setRawSettings(finalSettings);
          setLocalSettings(finalSettings);
        } else {
          // If validation fails, use default settings with default questions
          const defaultWithQuestions = {
            ...defaultSettings,
            questions: processedDefaultMCQ,
          };
          setRawSettings(defaultWithQuestions);
          setLocalSettings(defaultWithQuestions);
        }
      } else {
        // If no saved settings, use default settings with default questions
        const defaultWithQuestions = {
          ...defaultSettings,
          questions: processedDefaultMCQ,
        };
        setRawSettings(defaultWithQuestions);
        setLocalSettings(defaultWithQuestions);
      }
    } catch (error) {
      console.error("Error loading settings from localStorage:", error);
      // Fallback to default settings
      const defaultWithQuestions = {
        ...defaultSettings,
        questions: processedDefaultMCQ,
      };
      setRawSettings(defaultWithQuestions);
      setLocalSettings(defaultWithQuestions);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Load quiz state from localStorage
  useEffect(() => {
    if (!isLoaded) return;

    try {
      const savedState = localStorage.getItem(QUIZ_STATE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState) as QuizState;
        setCurrentQuestionIndex(parsedState.currentQuestionIndex);
        setSelectedOptions(parsedState.selectedOptions);
        setSubmittedQuestions(new Set(parsedState.submittedQuestions));

        // Check if the saved questions array exists and is not empty
        if (parsedState.questions && parsedState.questions.length > 0) {
          setQuizQuestions(parsedState.questions);
        } else {
          // Load questions from settings if saved questions are empty
          setQuizQuestions(getProcessedQuestions(rawSettings));
        }
      } else {
        setQuizQuestions(getProcessedQuestions(rawSettings));
      }
    } catch (error) {
      console.error("Failed to parse saved MCQ state:", error);
      setQuizQuestions(getProcessedQuestions(rawSettings));
    }
  }, [isLoaded, rawSettings]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rawSettings));
    }
  }, [rawSettings, isLoaded]);

  // Save quiz state to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return;

    const stateToSave: QuizState = {
      currentQuestionIndex,
      selectedOptions,
      submittedQuestions: Array.from(submittedQuestions),
      questions: quizQuestions,
    };

    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(stateToSave));
  }, [
    currentQuestionIndex,
    selectedOptions,
    submittedQuestions,
    quizQuestions,
    isLoaded,
  ]);

  // Process questions with randomization
  const getProcessedQuestions = (settings: MCQSettings): MCQItem[] => {
    let processedQuestions = [...settings.questions];

    // Randomize questions if the setting is enabled
    if (settings.randomizeQuestions) {
      processedQuestions = shuffleArray(processedQuestions);
    }

    // Randomize options if the setting is enabled
    if (settings.randomizeOptions) {
      processedQuestions = processedQuestions.map(shuffleOptions);
    }

    return processedQuestions;
  };

  // Apply randomization to questions and options if enabled
  const getProcessedSettings = (): MCQSettings => {
    return {
      ...rawSettings,
      questions: getProcessedQuestions(rawSettings),
    };
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setSubmittedQuestions(new Set());
    setQuizQuestions(getProcessedQuestions(rawSettings));
    localStorage.removeItem(QUIZ_STATE_KEY);
  };

  const updateSettings = (newSettings: MCQSettings) => {
    setRawSettings(newSettings);
    setLocalSettings(newSettings);
    setHasSettingsChanges(false);
    resetQuiz();
  };

  const value = {
    settings: getProcessedSettings(),
    rawSettings,
    settingsJson: JSON.stringify(rawSettings, null, 2),
    isLoaded,
    hasSettingsChanges,
    setHasSettingsChanges,
    localSettings,
    setLocalSettings,
    updateSettings,
    resetQuiz,
    currentQuestionIndex,
    selectedOptions,
    submittedQuestions,
    setCurrentQuestionIndex,
    setSelectedOptions,
    setSubmittedQuestions,
    quizQuestions,
    setQuizQuestions,
  };

  return <MCQContext.Provider value={value}>{children}</MCQContext.Provider>;
}

export function useMCQ() {
  const context = useContext(MCQContext);
  if (context === undefined) {
    throw new Error("useMCQ must be used within a MCQProvider");
  }
  return context;
}
