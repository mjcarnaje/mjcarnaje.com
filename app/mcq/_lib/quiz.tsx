"use client";

import { useState } from "react";
import { MCQItem, MCQSettings } from "./schema";
import { Confetti } from "./confetti";
import {
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
  Info,
  Award,
  MessageCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    // Only show answer if the question has an option selected AND
    // either showAnswerImmediately is true OR the question has been submitted
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
    // First set the selected option
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));

    // If we should show answers immediately
    if (settings.showAnswerImmediately) {
      // Mark as submitted with a small delay to allow animation
      setTimeout(() => {
        setSubmittedQuestions((prev) => {
          const newSubmitted = new Set(prev);
          newSubmitted.add(questionId);
          return newSubmitted;
        });

        // Show confetti if correct (with a small delay for better UX)
        if (option === answer && settings.showConfetti) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000);
        }
      }, 300);
    }
  };

  const handleSubmit = (questionId: number | string, answer: string) => {
    // Mark as submitted with a small delay for animation
    setTimeout(() => {
      setSubmittedQuestions((prev) => {
        const newSubmitted = new Set(prev);
        newSubmitted.add(questionId);
        return newSubmitted;
      });

      // Show confetti if correct (with a small delay for better UX)
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const questionVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        // Make sure content stays visible until animation completes
        opacity: { duration: 0.2, delay: 0.1 },
      },
    },
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: "spring", damping: 15 } },
    selected: {
      scale: 0.98,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderColor: "#3b82f6",
      transition: { duration: 0.2 },
    },
    correct: {
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      borderColor: "#22c55e",
      transition: { type: "spring", duration: 0.5 },
    },
    incorrect: {
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      borderColor: "#ef4444",
      transition: { type: "spring", duration: 0.5 },
    },
  };

  const explanationVariants = {
    hidden: { opacity: 0, height: 0 },
    show: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: (percent: number) => ({
      width: `${percent}%`,
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
  };

  // Render a single question card
  const renderQuestionCard = (question: MCQItem, index: number) => {
    const selected = getSelectedOption(question.id);
    const isSubmitted = isQuestionSubmitted(question.id);
    const isAnswerCorrect = isCorrect(question.id, question.answer);
    const shouldShowAnswer = showAnswer(question.id);

    return (
      <motion.div
        key={`question-card-${question.id}`}
        variants={questionVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        layout
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl"
      >
        <div className="flex justify-between items-start mb-6">
          <motion.h3
            className="text-xl font-medium flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full mr-3 text-lg font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {index + 1}
            </motion.span>
            {question.question}
          </motion.h3>

          {shouldShowAnswer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
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
            </motion.div>
          )}
        </div>

        <motion.div
          className="space-y-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {Object.entries(question.options).map(([key, value], optionIndex) => {
            const isSelected = selected === key;
            const isCorrectOption = key === question.answer;

            // Determine which animation variant to use
            let animationState = "show";
            if (shouldShowAnswer) {
              if (isCorrectOption) {
                animationState = "correct";
              } else if (isSelected && !isCorrectOption) {
                animationState = "incorrect";
              }
            } else if (isSelected) {
              animationState = "selected";
            }

            return (
              <motion.button
                key={key}
                onClick={() =>
                  handleOptionSelect(question.id, key, question.answer)
                }
                disabled={isSubmitted}
                className="block w-full p-5 border-2 rounded-xl text-left transition overflow-hidden flex items-center"
                initial="hidden"
                animate={animationState}
                variants={optionVariants}
                custom={optionIndex}
                whileHover={!isSubmitted ? { scale: 1.02 } : {}}
                whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                transition={{
                  delay: optionIndex * 0.05,
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              >
                <motion.span
                  className="font-mono bg-slate-200 dark:bg-slate-700 h-10 w-10 rounded-full flex items-center justify-center mr-4 shrink-0 text-lg font-bold shadow-sm"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {key.toUpperCase()}
                </motion.span>
                <span className="flex-1 font-medium">{value}</span>

                {shouldShowAnswer && isCorrectOption && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, delay: 0.2 }}
                  >
                    <Check
                      className="text-green-600 dark:text-green-400 ml-2 shrink-0"
                      size={24}
                    />
                  </motion.div>
                )}

                {shouldShowAnswer && isSelected && !isCorrectOption && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, delay: 0.2 }}
                  >
                    <X
                      className="text-red-600 dark:text-red-400 ml-2 shrink-0"
                      size={24}
                    />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {!settings.showAnswerImmediately && !isSubmitted && (
          <motion.button
            onClick={() => handleSubmit(question.id, question.answer)}
            disabled={!selected}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl disabled:opacity-50 transition hover:bg-blue-600 flex items-center justify-center font-bold text-lg"
            whileHover={selected ? { scale: 1.05 } : {}}
            whileTap={selected ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Send size={18} className="mr-2" />
            Check Answer
          </motion.button>
        )}

        {shouldShowAnswer && question.explanation && (
          <motion.div
            className="mt-8 p-5 bg-blue-50 dark:bg-blue-900/30 rounded-xl border-2 border-blue-200 dark:border-blue-800"
            variants={explanationVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h4
              className="font-bold mb-3 flex items-center text-blue-700 dark:text-blue-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <MessageCircle size={20} className="mr-2" />
              Explanation:
            </motion.h4>
            <motion.p
              className="text-slate-700 dark:text-slate-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {question.explanation}
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    );
  };

  if (settings.questions.length === 0) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-[400px] bg-slate-100 dark:bg-slate-800 rounded-xl p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
          >
            <AlertCircle size={50} className="mx-auto mb-5 text-amber-500" />
          </motion.div>
          <motion.p
            className="text-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No questions available. Please add questions in the settings tab.
          </motion.p>
        </div>
      </motion.div>
    );
  }

  // Calculate progress for progress bar
  const progress = showAllQuestions
    ? (Object.keys(selectedOptions).length / settings.questions.length) * 100
    : (currentQuestionIndex / (settings.questions.length - 1)) * 100;

  return (
    <motion.div
      className="space-y-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Confetti active={showConfetti} />

      {/* Progress bar */}
      <motion.div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-green-500 dark:bg-green-400"
          variants={progressVariants}
          initial="initial"
          animate="animate"
          custom={progress}
        />
      </motion.div>

      {showAllQuestions ? (
        // Show all questions mode
        <div className="space-y-8">
          <motion.div
            className="bg-slate-100 dark:bg-slate-800 rounded-xl p-5 flex items-center justify-between"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Award size={24} className="mr-3 text-amber-500" />
              </motion.div>
              Quiz ({settings.questions.length} questions)
            </h2>

            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Answer all questions{" "}
                {settings.showAnswerImmediately
                  ? "to see immediate feedback"
                  : "and submit each one"}
              </div>
              <motion.button
                onClick={handleReset}
                className="px-4 py-2 bg-white dark:bg-slate-700 rounded-lg transition hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center text-red-500 dark:text-red-400 font-medium"
                aria-label="Reset quiz"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw size={16} className="mr-2" />
                Reset
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {settings.questions.map((question, index) =>
              renderQuestionCard(question, index)
            )}
          </motion.div>
        </div>
      ) : (
        // One-by-one mode - completely redesigned
        <div className="space-y-6">
          {/* Navigation header */}
          <motion.div
            className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-5"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="font-mono bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
              >
                {currentQuestionIndex + 1}
              </motion.div>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                of {settings.questions.length}
              </span>
            </div>

            <div className="flex space-x-3">
              <motion.button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-white dark:bg-slate-700 rounded-lg disabled:opacity-50 transition hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center font-medium"
                aria-label="Previous question"
                whileHover={
                  currentQuestionIndex !== 0 ? { scale: 1.05, x: -2 } : {}
                }
                whileTap={currentQuestionIndex !== 0 ? { scale: 0.95 } : {}}
              >
                <ChevronLeft size={18} className="mr-1" />
                Prev
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={
                  currentQuestionIndex === settings.questions.length - 1
                }
                className="px-4 py-2 bg-white dark:bg-slate-700 rounded-lg disabled:opacity-50 transition hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center font-medium"
                aria-label="Next question"
                whileHover={
                  currentQuestionIndex !== settings.questions.length - 1
                    ? { scale: 1.05, x: 2 }
                    : {}
                }
                whileTap={
                  currentQuestionIndex !== settings.questions.length - 1
                    ? { scale: 0.95 }
                    : {}
                }
              >
                Next
                <ChevronRight size={18} className="ml-1" />
              </motion.button>
              <motion.button
                onClick={handleReset}
                className="px-4 py-2 bg-white dark:bg-slate-700 rounded-lg transition hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center text-red-500 dark:text-red-400 font-medium"
                aria-label="Reset quiz"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw size={16} className="mr-2" />
                Reset
              </motion.button>
            </div>
          </motion.div>

          {/* Question container - simplified without AnimatePresence */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700">
            {/* Question header */}
            <div className="flex justify-between items-start mb-6">
              <motion.h3
                className="text-xl font-medium flex-1"
                key={`question-title-${currentQuestion.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentQuestion.question}
              </motion.h3>

              {showAnswer(currentQuestion.id) && (
                <motion.div
                  key={`answer-feedback-${currentQuestion.id}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
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
                </motion.div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-4 mb-6">
              {Object.entries(currentQuestion.options).map(
                ([key, value], optionIndex) => {
                  const isSelected =
                    getSelectedOption(currentQuestion.id) === key;
                  const isCorrectOption = key === currentQuestion.answer;
                  const shouldShowAnswer = showAnswer(currentQuestion.id);
                  const isSubmitted = isQuestionSubmitted(currentQuestion.id);

                  // Determine option appearance
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
                    <motion.button
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: optionIndex * 0.1,
                        duration: 0.3,
                      }}
                      whileHover={!isSubmitted ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                    >
                      <span className="font-mono bg-slate-200 dark:bg-slate-700 h-10 w-10 rounded-full flex items-center justify-center mr-4 shrink-0 text-lg font-bold shadow-sm">
                        {key.toUpperCase()}
                      </span>
                      <span className="flex-1 font-medium">{value}</span>

                      {shouldShowAnswer && isCorrectOption && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            damping: 10,
                            delay: 0.2,
                          }}
                        >
                          <Check
                            className="text-green-600 dark:text-green-400 ml-2 shrink-0"
                            size={24}
                          />
                        </motion.div>
                      )}

                      {shouldShowAnswer && isSelected && !isCorrectOption && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            damping: 10,
                            delay: 0.2,
                          }}
                        >
                          <X
                            className="text-red-600 dark:text-red-400 ml-2 shrink-0"
                            size={24}
                          />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                }
              )}
            </div>

            {/* Submit button */}
            {!settings.showAnswerImmediately &&
              !isQuestionSubmitted(currentQuestion.id) && (
                <motion.button
                  onClick={() =>
                    handleSubmit(currentQuestion.id, currentQuestion.answer)
                  }
                  disabled={!getSelectedOption(currentQuestion.id)}
                  className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl disabled:opacity-50 transition hover:bg-blue-600 flex items-center justify-center font-bold text-lg"
                  whileHover={
                    getSelectedOption(currentQuestion.id) ? { scale: 1.05 } : {}
                  }
                  whileTap={
                    getSelectedOption(currentQuestion.id) ? { scale: 0.95 } : {}
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Send size={18} className="mr-2" />
                  Check Answer
                </motion.button>
              )}

            {/* Explanation */}
            {showAnswer(currentQuestion.id) && currentQuestion.explanation && (
              <motion.div
                key={`explanation-${currentQuestion.id}`}
                className="mt-8 p-5 bg-blue-50 dark:bg-blue-900/30 rounded-xl border-2 border-blue-200 dark:border-blue-800"
                initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  transition: { duration: 0.5 },
                }}
              >
                <h4 className="font-bold mb-3 flex items-center text-blue-700 dark:text-blue-300 text-lg">
                  <MessageCircle size={20} className="mr-2" />
                  Explanation:
                </h4>
                <p className="text-slate-700 dark:text-slate-300">
                  {currentQuestion.explanation}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};
