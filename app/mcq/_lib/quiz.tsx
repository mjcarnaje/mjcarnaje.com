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
import { useState } from "react";
import { Confetti } from "./confetti";
import { MCQItem, MCQSettings } from "./schema";

interface QuizProps {
  settings: MCQSettings;
}

export const Quiz: React.FC<QuizProps> = ({ settings }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number | string, string | null>
  >({});
  const [submittedQuestions, setSubmittedQuestions] = useState<
    Set<number | string>
  >(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const currentQuestion = settings.questions[currentQuestionIndex];
  const showAllQuestions = settings.showAllQuestions;

  const getSelectedOption = (questionId: number | string) => {
    return selectedOptions[questionId] || null;
  };

  const isQuestionSubmitted = (questionId: number | string) => {
    return submittedQuestions.has(questionId);
  };

  const isCorrect = (questionId: number | string, questionAnswer: string) => {
    return getSelectedOption(questionId) === questionAnswer;
  };

  const showAnswer = (questionId: number | string) => {
    return (
      getSelectedOption(questionId) !== null &&
      (settings.showAnswerImmediately || isQuestionSubmitted(questionId))
    );
  };

  const handleOptionSelect = (
    questionId: number | string,
    option: string,
    answer: string
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));

    setTimeout(() => {
      setSubmittedQuestions((prev) => {
        const newSubmitted = new Set(prev);
        newSubmitted.add(questionId);
        return newSubmitted;
      });

      if (option === answer && settings.showConfetti) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }, 300);
  };

  const handleSubmit = (questionId: number | string, answer: string) => {
    setTimeout(() => {
      setSubmittedQuestions((prev) => {
        const newSubmitted = new Set(prev);
        newSubmitted.add(questionId);
        return newSubmitted;
      });

      const selectedOption = getSelectedOption(questionId);
      if (selectedOption === answer && settings.showConfetti) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestionIndex < settings.questions.length - 1) {
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
  };

  // Render a single question card without animations
  const renderQuestionCard = (question: MCQItem, index: number) => {
    const selected = getSelectedOption(question.id);
    const isSubmitted = isQuestionSubmitted(question.id);
    const isAnswerCorrect = isCorrect(question.id, question.answer);
    const shouldShowAnswer = showAnswer(question.id);

    return (
      <div
        key={`question-card-${question.id}`}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl"
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-medium flex-1">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full mr-3 text-lg font-bold">
              {index + 1}
            </span>
            {question.question}
          </h3>

          {shouldShowAnswer && (
            <div
              className={`px-4 py-2 rounded-full flex items-center text-sm font-medium ${
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
                  handleOptionSelect(question.id, key, question.answer)
                }
                disabled={isSubmitted}
                className={`block w-full p-5 border-2 rounded-xl text-left transition overflow-hidden flex items-center ${
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
            onClick={() => handleSubmit(question.id, question.answer)}
            disabled={!selected}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl disabled:opacity-50 transition hover:bg-blue-600 flex items-center justify-center font-bold text-lg"
          >
            <Send size={18} className="mr-2" />
            Check Answer
          </button>
        )}

        {shouldShowAnswer && question.explanation && (
          <div className="mt-8 p-5 bg-blue-50 dark:bg-blue-900/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
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

  if (settings.questions.length === 0) {
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

  // Calculate progress for progress bar
  const progress = showAllQuestions
    ? (Object.keys(selectedOptions).length / settings.questions.length) * 100
    : (currentQuestionIndex / (settings.questions.length - 1)) * 100;

  return (
    <div className="space-y-6 relative">
      <Confetti active={showConfetti} />

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 dark:bg-green-400"
          style={{
            width: `${progress}%`,
            transition: "width 0.5s ease-in-out",
          }}
        />
      </div>

      {showAllQuestions ? (
        <div className="space-y-8">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-5 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              <div>
                <Award size={24} className="mr-3 text-amber-500" />
              </div>
              Quiz ({settings.questions.length} questions)
            </h2>

            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
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
            {settings.questions.map((question, index) =>
              renderQuestionCard(question, index)
            )}
          </div>
        </div>
      ) : (
        // One-by-one mode
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2">
              <div className="font-mono bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold">
                {currentQuestionIndex + 1}
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                of {settings.questions.length}
              </span>
            </div>

            <div className="flex space-x-3">
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
                disabled={
                  currentQuestionIndex === settings.questions.length - 1
                }
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

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start mb-6">
              <h3
                className="text-xl font-medium flex-1"
                key={`question-title-${currentQuestion.id}`}
              >
                {currentQuestion.question}
              </h3>

              {showAnswer(currentQuestion.id) && (
                <div
                  key={`answer-feedback-${currentQuestion.id}`}
                  className={`px-4 py-2 rounded-full flex items-center text-sm font-medium ${
                    isCorrect(currentQuestion.id, currentQuestion.answer)
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {isCorrect(currentQuestion.id, currentQuestion.answer) ? (
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
                    getSelectedOption(currentQuestion.id) === key;
                  const isCorrectOption = key === currentQuestion.answer;
                  const shouldShowAnswer = showAnswer(currentQuestion.id);
                  const isSubmitted = isQuestionSubmitted(currentQuestion.id);

                  let optionClassName =
                    "block w-full p-5 border-2 rounded-xl text-left transition flex items-center";

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
                      key={`option-${currentQuestion.id}-${key}`}
                      onClick={() =>
                        handleOptionSelect(
                          currentQuestion.id,
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
              !isQuestionSubmitted(currentQuestion.id) && (
                <button
                  onClick={() =>
                    handleSubmit(currentQuestion.id, currentQuestion.answer)
                  }
                  disabled={!getSelectedOption(currentQuestion.id)}
                  className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl disabled:opacity-50 transition hover:bg-blue-600 flex items-center justify-center font-bold text-lg"
                >
                  <Send size={18} className="mr-2" />
                  Check Answer
                </button>
              )}

            {showAnswer(currentQuestion.id) && currentQuestion.explanation && (
              <div className="mt-8 p-5 bg-blue-50 dark:bg-blue-900/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
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
