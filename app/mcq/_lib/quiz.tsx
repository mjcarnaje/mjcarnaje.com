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
import { useMCQ } from "./MCQContext";
import { MCQItem } from "./schema";

export const Quiz = () => {
  const {
    settings,
    quizQuestions,
    setQuizQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedOptions,
    setSelectedOptions,
    submittedQuestions,
    setSubmittedQuestions,
    resetQuiz,
  } = useMCQ();

  const [showConfetti, setShowConfetti] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    setIsInitialized(true);
  }, []);

  // Show loading indicator while questions are being loaded
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-slate-100 dark:bg-slate-800 rounded-xl p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show empty state if no questions are available
  if (!quizQuestions || quizQuestions.length === 0) {
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

  const currentQuestion = quizQuestions[currentQuestionIndex];
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
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: option,
    });

    setTimeout(() => {
      const newSubmitted = new Set(submittedQuestions);
      newSubmitted.add(questionIndex);
      setSubmittedQuestions(newSubmitted);

      if (option === answer && settings.showConfetti) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }, 300);
  };

  const handleSubmit = (questionIndex: number, answer: string) => {
    setTimeout(() => {
      const newSubmitted = new Set(submittedQuestions);
      newSubmitted.add(questionIndex);
      setSubmittedQuestions(newSubmitted);

      const selectedOption = getSelectedOption(questionIndex);
      if (selectedOption === answer && settings.showConfetti) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleReset = () => {
    resetQuiz();
    setShowConfetti(false);
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
              </button>
            );
          })}
        </div>

        {question.explanation && isSubmitted && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 flex items-center mb-2">
              <MessageCircle size={18} className="mr-2" />
              Explanation
            </h4>
            <p className="text-blue-700 dark:text-blue-200">
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 mb-10">
      {showConfetti && <Confetti active={true} />}

      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-bold flex items-center">
          <div>
            <Award size={24} className="mr-3 text-amber-500" />
          </div>
          Quiz ({quizQuestions.length} questions)
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

      {showAllQuestions ? (
        <div className="space-y-8">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-xl font-bold flex items-center">
              <div>
                <Award size={24} className="mr-3 text-amber-500" />
              </div>
              Quiz ({quizQuestions.length} questions)
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
            {quizQuestions.map((question, index) =>
              renderQuestionCard(question, index)
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center flex-wrap gap-2 py-2 overflow-x-auto">
            {quizQuestions.map((question, index) => {
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

          <div className="mt-6">
            {renderQuestionCard(currentQuestion, currentQuestionIndex)}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
                currentQuestionIndex === 0
                  ? "text-slate-400 dark:text-slate-600"
                  : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600"
              }`}
            >
              <ChevronLeft size={18} className="mr-1" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === quizQuestions.length - 1}
              className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
                currentQuestionIndex === quizQuestions.length - 1
                  ? "text-slate-400 dark:text-slate-600"
                  : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600"
              }`}
            >
              Next
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
