"use client";

import {
  AlertCircle,
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  RefreshCw,
  Send,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Confetti } from "./confetti";
import { MCQItem, MCQSettings } from "./schema";

interface QuizProps {
  settings: MCQSettings;
}

interface QuizState {
  currentQuestionIndex: number;
  selectedOptions: Record<number, string | null>;
  submittedQuestions: number[];
  questions: MCQItem[];
}

export const Quiz: React.FC<QuizProps> = ({ settings }) => {
  const [questions, setQuestions] = useState<MCQItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string | null>
  >({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Set<number>>(
    new Set()
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load state from localStorage when component mounts
  useEffect(() => {
    setIsLoading(true);
    const savedState = localStorage.getItem("mcq_state");

    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState) as QuizState;
        setCurrentQuestionIndex(parsedState.currentQuestionIndex);
        setSelectedOptions(parsedState.selectedOptions);
        setSubmittedQuestions(new Set(parsedState.submittedQuestions));

        // Check if the saved questions array exists and is not empty
        if (parsedState.questions && parsedState.questions.length > 0) {
          setQuestions(parsedState.questions);
        } else {
          // Load default questions if saved questions are empty
          setQuestions(settings.questions);
        }
      } catch (error) {
        console.error("Failed to parse saved MCQ state:", error);
        setQuestions(settings.questions);
      }
    } else {
      setQuestions(settings.questions);
    }

    setIsInitialized(true);
    setIsLoading(false);
  }, [settings.questions]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized || isLoading) return;

    const stateToSave: QuizState = {
      currentQuestionIndex,
      selectedOptions,
      submittedQuestions: Array.from(submittedQuestions),
      questions,
    };

    localStorage.setItem("mcq_state", JSON.stringify(stateToSave));
  }, [
    currentQuestionIndex,
    selectedOptions,
    submittedQuestions,
    questions,
    isInitialized,
    isLoading,
  ]);

  // Show loading indicator while questions are being loaded
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-slate-100 dark:bg-slate-800 rounded-xl p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show empty state if no questions are available
  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-slate-100 dark:bg-slate-800 rounded-xl p-8">
        <div className="text-center">
          <div>
            <AlertCircle size={50} className="mx-auto mb-5 text-amber-500" />
          </div>
          <p className="text-xl">
            No questions available. Please add questions in the settings tab.
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const showAllQuestions = settings.showAllQuestions;

  const getSelectedOption = (questionIndex: number) => {
    return selectedOptions[questionIndex] || null;
  };

  const isQuestionSubmitted = (questionIndex: number) => {
    return submittedQuestions.has(questionIndex);
  };

  const isCorrect = (questionIndex: number, questionAnswer: string) => {
    return getSelectedOption(questionIndex) === questionAnswer;
  };

  const showAnswer = (questionIndex: number) => {
    return (
      getSelectedOption(questionIndex) !== null &&
      (settings.showAnswerImmediately || isQuestionSubmitted(questionIndex))
    );
  };

  const handleOptionSelect = (
    questionIndex: number,
    option: string,
    answer: string
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));

    setTimeout(() => {
      setSubmittedQuestions((prev) => {
        const newSubmitted = new Set(prev);
        newSubmitted.add(questionIndex);
        return newSubmitted;
      });

      if (option === answer && settings.showConfetti) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }, 300);
  };

  const handleSubmit = (questionIndex: number, answer: string) => {
    setTimeout(() => {
      setSubmittedQuestions((prev) => {
        const newSubmitted = new Set(prev);
        newSubmitted.add(questionIndex);
        return newSubmitted;
      });

      const selectedOption = getSelectedOption(questionIndex);
      if (selectedOption === answer && settings.showConfetti) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setSubmittedQuestions(new Set());
    setShowConfetti(false);
    setQuestions(settings.questions);

    // Clear saved state from localStorage
    localStorage.removeItem("mcq_state");
  };

  // Render a single question card without animations
  const renderQuestionCard = (question: MCQItem, index: number) => {
    const selected = getSelectedOption(index);
    const isSubmitted = isQuestionSubmitted(index);
    const isAnswerCorrect = isCorrect(index, question.answer);
    const shouldShowAnswer = showAnswer(index);

    return (
      <div
        key={`question-card-${index}`}
        className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <h3 className="text-xl font-medium flex-1">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full mr-3 text-lg font-bold">
              {index + 1}
            </span>
            {question.question}
          </h3>

          {shouldShowAnswer && (
            <div
              className={`px-4 py-2 rounded-full flex items-center text-sm font-medium flex-shrink-0 ${
                isAnswerCorrect
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {isAnswerCorrect ? (
                <>
                  <Check size={16} className="mr-2" />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <X size={16} className="mr-2" />
                  <span>Incorrect</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4 mb-6">
          {Object.entries(question.options).map(([key, value], optionIndex) => {
            const isSelected = selected === key;
            const isCorrectOption = key === question.answer;

            return (
              <button
                key={key}
                onClick={() =>
                  !isSubmitted &&
                  handleOptionSelect(index, key, question.answer)
                }
                disabled={isSubmitted}
                className={`block w-full p-4 sm:p-5 border-2 rounded-xl text-left transition overflow-hidden flex items-center ${
                  shouldShowAnswer && isCorrectOption
                    ? "bg-green-50 dark:bg-green-900/30 border-green-500"
                    : shouldShowAnswer && isSelected && !isCorrectOption
                    ? "bg-red-50 dark:bg-red-900/30 border-red-500"
                    : isSelected
                    ? "bg-blue-50 dark:bg-blue-900/30 border-blue-500"
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                }`}
              >
                <span className="font-mono bg-slate-200 dark:bg-slate-700 h-10 w-10 rounded-full flex items-center justify-center mr-4 shrink-0 text-lg font-bold shadow-sm">
                  {key.toUpperCase()}
                </span>
                <span className="flex-1 font-medium">{value}</span>

                {shouldShowAnswer && (
                  <>
                    {isCorrectOption && (
                      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 ml-2">
                        <Check
                          className="text-green-600 dark:text-green-400 shrink-0"
                          size={20}
                        />
                      </div>
                    )}

                    {isSelected && !isCorrectOption && (
                      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/50 ml-2">
                        <X
                          className="text-red-600 dark:text-red-400 shrink-0"
                          size={20}
                        />
                      </div>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {!settings.showAnswerImmediately && !isSubmitted && (
          <button
            onClick={() => handleSubmit(index, question.answer)}
            disabled={!selected}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl disabled:opacity-50 transition hover:bg-blue-600 flex items-center justify-center font-bold text-lg w-full sm:w-auto"
          >
            <Send size={18} className="mr-2" />
            Check Answer
          </button>
        )}

        {shouldShowAnswer && question.explanation && (
          <div className="mt-8 p-4 sm:p-5 bg-blue-50 dark:bg-blue-900/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
            <h4 className="font-bold mb-3 flex items-center text-blue-700 dark:text-blue-300 text-lg">
              <MessageCircle size={20} className="mr-2" />
              Explanation:
            </h4>
            <p className="text-slate-700 dark:text-slate-300">
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Calculate progress for progress bar
  const progress = showAllQuestions
    ? (Object.keys(selectedOptions).length / questions.length) * 100
    : (currentQuestionIndex / (questions.length - 1)) * 100;

  return (
    <div className="space-y-6 relative">
      <Confetti active={showConfetti} />

      {/* Question navigation indicators */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-3">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="w-full sm:w-auto px-3 py-2 bg-white dark:bg-slate-700 rounded-lg disabled:opacity-50 transition hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center justify-center font-medium"
          >
            <ChevronLeft size={18} className="mr-1" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            className="w-full sm:w-auto px-3 py-2 bg-white dark:bg-slate-700 rounded-lg disabled:opacity-50 transition hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center justify-center font-medium"
          >
            Next
            <ChevronRight size={18} className="ml-1" />
          </button>
        </div>

        <div className="flex justify-center items-center flex-wrap gap-2 py-2 overflow-x-auto">
          {questions.map((question, index) => {
            const isSelected = currentQuestionIndex === index;
            const isAnswered = getSelectedOption(index) !== null;
            const isSubmitted = isQuestionSubmitted(index);
            const isCorrect =
              isSubmitted && getSelectedOption(index) === question.answer;

            let bgColor = "bg-slate-300 dark:bg-slate-600"; // not answered
            let textColor = "text-slate-700 dark:text-slate-200";

            if (isSubmitted) {
              bgColor = isCorrect
                ? "bg-green-500 dark:bg-green-400" // correct
                : "bg-red-500 dark:bg-red-400"; // incorrect
              textColor = "text-white";
            } else if (isAnswered) {
              bgColor = "bg-blue-500 dark:bg-blue-400"; // answered but not submitted
              textColor = "text-white";
            }

            return (
              <button
                key={`nav-${index}`}
                onClick={() =>
                  !showAllQuestions && setCurrentQuestionIndex(index)
                }
                className={`flex h-8 w-8 items-center text-xs border-2 justify-center rounded-lg transition-all ${bgColor} ${textColor} ${
                  isSelected
                    ? "border-blue-600 dark:border-blue-300 shadow-md"
                    : "border-transparent"
                } ${
                  showAllQuestions
                    ? "cursor-default"
                    : "cursor-pointer hover:opacity-80"
                }`}
                aria-label={`Go to question ${index + 1}`}
                disabled={showAllQuestions}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {showAllQuestions ? (
        <div className="space-y-8">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-xl font-bold flex items-center">
              <div>
                <Award size={24} className="mr-3 text-amber-500" />
              </div>
              Quiz ({questions.length} questions)
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium text-center sm:text-left">
                Answer all questions{" "}
                {settings.showAnswerImmediately
                  ? "to see immediate feedback"
                  : "and submit each one"}
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-white dark:bg-slate-700 rounded-lg transition hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center text-red-500 dark:text-red-400 font-medium"
                aria-label="Reset quiz"
              >
                <RefreshCw size={16} className="mr-2" />
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((question, index) =>
              renderQuestionCard(question, index)
            )}
          </div>
        </div>
      ) : (
        // One-by-one mode
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <div className="font-mono bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold">
                {currentQuestionIndex + 1}
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                of {questions.length}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-white dark:bg-slate-700 rounded-lg disabled:opacity-50 transition hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center font-medium"
                aria-label="Previous question"
              >
                <ChevronLeft size={18} className="mr-1" />
                Prev
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
                className="px-4 py-2 bg-white dark:bg-slate-700 rounded-lg disabled:opacity-50 transition hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center font-medium"
                aria-label="Next question"
              >
                Next
                <ChevronRight size={18} className="ml-1" />
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-white dark:bg-slate-700 rounded-lg transition hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center text-red-500 dark:text-red-400 font-medium"
                aria-label="Reset quiz"
              >
                <RefreshCw size={16} className="mr-2" />
                Reset
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
              <h3
                className="text-xl font-medium flex-1"
                key={`question-title-${currentQuestionIndex}`}
              >
                {currentQuestion.question}
              </h3>

              {showAnswer(currentQuestionIndex) && (
                <div
                  key={`answer-feedback-${currentQuestionIndex}`}
                  className={`px-4 py-2 rounded-full flex items-center text-sm font-medium flex-shrink-0 ${
                    isCorrect(currentQuestionIndex, currentQuestion.answer)
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {isCorrect(currentQuestionIndex, currentQuestion.answer) ? (
                    <>
                      <Check size={16} className="mr-2" />
                      <span>Correct!</span>
                    </>
                  ) : (
                    <>
                      <X size={16} className="mr-2" />
                      <span>Incorrect</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              {Object.entries(currentQuestion.options).map(
                ([key, value], optionIndex) => {
                  const isSelected =
                    getSelectedOption(currentQuestionIndex) === key;
                  const isCorrectOption = key === currentQuestion.answer;
                  const shouldShowAnswer = showAnswer(currentQuestionIndex);
                  const isSubmitted = isQuestionSubmitted(currentQuestionIndex);

                  let optionClassName =
                    "block w-full p-4 sm:p-5 border-2 rounded-xl text-left transition flex items-center";

                  if (shouldShowAnswer) {
                    if (isCorrectOption) {
                      optionClassName +=
                        " bg-green-50 dark:bg-green-900/30 border-green-500";
                    } else if (isSelected && !isCorrectOption) {
                      optionClassName +=
                        " bg-red-50 dark:bg-red-900/30 border-red-500";
                    }
                  } else if (isSelected) {
                    optionClassName +=
                      " bg-blue-50 dark:bg-blue-900/30 border-blue-500";
                  } else {
                    optionClassName +=
                      " border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50";
                  }

                  return (
                    <button
                      key={`option-${currentQuestionIndex}-${key}`}
                      onClick={() =>
                        handleOptionSelect(
                          currentQuestionIndex,
                          key,
                          currentQuestion.answer
                        )
                      }
                      disabled={isSubmitted}
                      className={optionClassName}
                    >
                      <span className="font-mono bg-slate-200 dark:bg-slate-700 h-10 w-10 rounded-full flex items-center justify-center mr-4 shrink-0 text-lg font-bold shadow-sm">
                        {key.toUpperCase()}
                      </span>
                      <span className="flex-1 font-medium">{value}</span>

                      {shouldShowAnswer && (
                        <>
                          {isCorrectOption && (
                            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 ml-2">
                              <Check
                                className="text-green-600 dark:text-green-400 shrink-0"
                                size={20}
                              />
                            </div>
                          )}

                          {isSelected && !isCorrectOption && (
                            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/50 ml-2">
                              <X
                                className="text-red-600 dark:text-red-400 shrink-0"
                                size={20}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </button>
                  );
                }
              )}
            </div>

            {!settings.showAnswerImmediately &&
              !isQuestionSubmitted(currentQuestionIndex) && (
                <button
                  onClick={() =>
                    handleSubmit(currentQuestionIndex, currentQuestion.answer)
                  }
                  disabled={!getSelectedOption(currentQuestionIndex)}
                  className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl disabled:opacity-50 transition hover:bg-blue-600 flex items-center justify-center font-bold text-lg w-full sm:w-auto"
                >
                  <Send size={18} className="mr-2" />
                  Check Answer
                </button>
              )}

            {showAnswer(currentQuestionIndex) &&
              currentQuestion.explanation && (
                <div className="mt-8 p-4 sm:p-5 bg-blue-50 dark:bg-blue-900/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                  <h4 className="font-bold mb-3 flex items-center text-blue-700 dark:text-blue-300 text-lg">
                    <MessageCircle size={20} className="mr-2" />
                    Explanation:
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};
