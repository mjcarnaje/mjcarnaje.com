"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuizlet } from "../_lib/quizlet-context";
import { QuestionItem, QuizModeConfig } from "../_lib/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Settings2, ArrowRight, Check, X } from "lucide-react";
import { shuffle } from "@/lib/utils";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Confetti } from "../_lib/confetti";

export default function Page() {
  const { questions, quizModeConfig, handleQuizModeConfigChange } =
    useQuizlet();
  const [isConfiguring, setIsConfiguring] = useState(true);
  const [config, setConfig] = useState<QuizModeConfig>({
    ...quizModeConfig,
  });

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Prepare questions based on config
  const preparedQuestions = useMemo(() => {
    let questionList = [...questions];

    // Randomize questions if enabled
    if (config.randomizeQuestions) {
      questionList = shuffle(questionList);
    }

    // Randomize options if enabled
    if (config.randomizeOptions) {
      return questionList.map((question) => {
        const optionEntries = Object.entries(question.options);
        const shuffledOptions = shuffle(optionEntries);

        // Create mapping from shuffled position to original key
        const optionMapping: Record<string, string> = {};
        const newOptions: Record<string, string> = {};

        shuffledOptions.forEach(([originalKey, value], index) => {
          const newKey = String.fromCharCode(97 + index); // a, b, c, d
          newOptions[newKey] = value;
          optionMapping[newKey] = originalKey;
        });

        return {
          ...question,
          options: newOptions,
          originalAnswer: question.answer,
          // Map the answer to the new position
          answer:
            Object.entries(optionMapping).find(
              ([, originalKey]) => originalKey === question.answer
            )?.[0] || question.answer,
          optionMapping,
        };
      });
    }

    // Add empty optionMapping and originalAnswer for type consistency
    return questionList.map((question) => ({
      ...question,
      originalAnswer: question.answer,
      optionMapping: {} as Record<string, string>,
    }));
  }, [questions, config.randomizeQuestions, config.randomizeOptions]);

  const startQuiz = () => {
    // Save the configuration
    handleQuizModeConfigChange(config);
    setIsConfiguring(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsQuizComplete(false);
    setShowConfetti(false);
  };

  const resetQuiz = () => {
    setIsConfiguring(true);
    setShowConfetti(false);
  };

  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    if (selectedAnswers[questionIndex] !== undefined) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));

    // If showing all questions, check if quiz is complete
    if (config.showAllQuestions) {
      const allAnswered = preparedQuestions.every(
        (_, index) =>
          selectedAnswers[index] !== undefined || index === questionIndex
      );

      if (allAnswered) {
        completeQuiz();
      }
    } else if (currentQuestionIndex === preparedQuestions.length - 1) {
      // If this is the last question in single question mode
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    setIsQuizComplete(true);
    if (config.showConfetti) {
      setShowConfetti(true);
      // Hide confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < preparedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      completeQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    preparedQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correct++;
      }
    });
    return {
      correct,
      total: preparedQuestions.length,
      percentage: Math.round((correct / preparedQuestions.length) * 100),
    };
  };

  if (isConfiguring) {
    return (
      <div className="max-w-4xl mx-auto p-2 sm:p-4">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Quiz Mode
          </h1>

          <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              What is Quiz Mode?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Quiz Mode tests your knowledge through a structured assessment.
              Answer questions and receive immediate feedback.
            </p>

            <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              <li>Questions appear one at a time</li>
              <li>Select your answer and receive immediate feedback</li>
              <li>Review your results at the end of the quiz</li>
              <li>Track your progress and aim to improve your score</li>
            </ul>
          </Card>

          <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Settings
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="space-y-0.5">
                  <Label htmlFor="show-confetti">Show Confetti</Label>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Celebrate correct answers with confetti
                  </p>
                </div>
                <Switch
                  id="show-confetti"
                  checked={config.showConfetti}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      showConfetti: checked,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="space-y-0.5">
                  <Label htmlFor="show-answer-immediately">
                    Show Answer Immediately
                  </Label>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Show correct answer immediately after answering
                  </p>
                </div>
                <Switch
                  id="show-answer-immediately"
                  checked={config.showAnswerImmediately}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      showAnswerImmediately: checked,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="space-y-0.5">
                  <Label htmlFor="show-all-questions">Show All Questions</Label>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Display all questions at once instead of one at a time
                  </p>
                </div>
                <Switch
                  id="show-all-questions"
                  checked={config.showAllQuestions}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      showAllQuestions: checked,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="space-y-0.5">
                  <Label htmlFor="randomize-questions">
                    Randomize Questions
                  </Label>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Shuffle the order of questions each time
                  </p>
                </div>
                <Switch
                  id="randomize-questions"
                  checked={config.randomizeQuestions}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      randomizeQuestions: checked,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="space-y-0.5">
                  <Label htmlFor="randomize-options">Randomize Options</Label>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Shuffle the order of answer options
                  </p>
                </div>
                <Switch
                  id="randomize-options"
                  checked={config.randomizeOptions}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      randomizeOptions: checked,
                    }))
                  }
                />
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              <Link href="/mcq">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Button
              onClick={startQuiz}
              className="w-full sm:w-auto px-4 sm:px-8 order-1 sm:order-2"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render quiz content
  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 relative">
      {/* Confetti overlay */}
      <Confetti active={showConfetti} />

      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold">Quiz</h1>
          {isQuizComplete && (
            <div className="text-base sm:text-lg font-medium">
              Score: {calculateScore().correct}/{calculateScore().total} (
              {calculateScore().percentage}%)
            </div>
          )}
        </div>

        {/* Show all questions mode */}
        {config.showAllQuestions ? (
          <div className="space-y-6 sm:space-y-8">
            {preparedQuestions.map((question, questionIndex) => (
              <Card key={questionIndex} className="p-4 sm:p-6 relative">
                <div className="mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm text-gray-500 mr-2">
                    Question {questionIndex + 1}
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {question.question}
                  </h2>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {Object.entries(question.options).map(([key, value]) => {
                    const isSelected = selectedAnswers[questionIndex] === key;
                    const isCorrect = question.answer === key;
                    const showResult =
                      isQuizComplete ||
                      (config.showAnswerImmediately && isSelected);

                    return (
                      <button
                        key={key}
                        className={`w-full text-left p-2 sm:p-3 rounded-md border transition-colors text-sm sm:text-base ${
                          isSelected
                            ? showResult
                              ? isCorrect
                                ? "bg-green-100 border-green-300"
                                : "bg-red-100 border-red-300"
                              : "bg-blue-100 border-blue-300"
                            : "bg-white hover:bg-gray-50 border-gray-200"
                        }`}
                        onClick={() => handleSelectAnswer(questionIndex, key)}
                        disabled={selectedAnswers[questionIndex] !== undefined}
                      >
                        <div className="flex items-center justify-between">
                          <span>
                            <span className="font-medium mr-2">
                              {key.toUpperCase()}.
                            </span>
                            {value}
                          </span>
                          {showResult &&
                            isSelected &&
                            (isCorrect ? (
                              <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                            ) : (
                              <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
                            ))}
                          {showResult && !isSelected && isCorrect && (
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {(isQuizComplete ||
                  (config.showAnswerImmediately &&
                    selectedAnswers[questionIndex] !== undefined)) &&
                  question.explanation && (
                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 rounded-md">
                      <p className="text-xs sm:text-sm text-gray-700">
                        <span className="font-medium">Explanation:</span>{" "}
                        {question.explanation}
                      </p>
                    </div>
                  )}
              </Card>
            ))}
          </div>
        ) : (
          // Show one question at a time mode
          <Card className="p-4 sm:p-6 relative">
            <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0">
              <span className="text-xs sm:text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of{" "}
                {preparedQuestions.length}
              </span>
              {!isQuizComplete && (
                <div className="text-xs sm:text-sm font-medium">
                  {Object.values(selectedAnswers).filter(Boolean).length}{" "}
                  answered
                </div>
              )}
            </div>

            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold">
                {preparedQuestions[currentQuestionIndex]?.question}
              </h2>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {Object.entries(
                preparedQuestions[currentQuestionIndex]?.options || {}
              ).map(([key, value]) => {
                const isSelected =
                  selectedAnswers[currentQuestionIndex] === key;
                const isCorrect =
                  preparedQuestions[currentQuestionIndex]?.answer === key;
                const showResult =
                  isQuizComplete ||
                  (config.showAnswerImmediately && isSelected);

                return (
                  <button
                    key={key}
                    className={`w-full text-left p-2 sm:p-3 rounded-md border transition-colors text-sm sm:text-base ${
                      isSelected
                        ? showResult
                          ? isCorrect
                            ? "bg-green-100 border-green-300"
                            : "bg-red-100 border-red-300"
                          : "bg-blue-100 border-blue-300"
                        : "bg-white hover:bg-gray-50 border-gray-200"
                    }`}
                    onClick={() =>
                      handleSelectAnswer(currentQuestionIndex, key)
                    }
                    disabled={
                      selectedAnswers[currentQuestionIndex] !== undefined &&
                      !isQuizComplete
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span className="pr-2">
                        <span className="font-medium mr-2">
                          {key.toUpperCase()}.
                        </span>
                        {value}
                      </span>
                      {showResult &&
                        isSelected &&
                        (isCorrect ? (
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
                        ))}
                      {showResult && !isSelected && isCorrect && (
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {(isQuizComplete ||
              (config.showAnswerImmediately &&
                selectedAnswers[currentQuestionIndex] !== undefined)) &&
              preparedQuestions[currentQuestionIndex]?.explanation && (
                <div className="mb-4 sm:mb-6 p-2 sm:p-3 bg-gray-50 rounded-md">
                  <p className="text-xs sm:text-sm text-gray-700">
                    <span className="font-medium">Explanation:</span>{" "}
                    {preparedQuestions[currentQuestionIndex]?.explanation}
                  </p>
                </div>
              )}

            {/* Navigation buttons */}
            <div className="flex justify-between gap-2">
              <Button
                variant="outline"
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
                className="text-xs sm:text-sm px-2 sm:px-4"
              >
                <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Previous
              </Button>

              {currentQuestionIndex < preparedQuestions.length - 1 ? (
                <Button
                  variant="outline"
                  onClick={nextQuestion}
                  disabled={
                    selectedAnswers[currentQuestionIndex] === undefined &&
                    !isQuizComplete
                  }
                  className="text-xs sm:text-sm px-2 sm:px-4"
                >
                  Next
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              ) : (
                <Button
                  onClick={completeQuiz}
                  disabled={
                    selectedAnswers[currentQuestionIndex] === undefined &&
                    !isQuizComplete
                  }
                  className="text-xs sm:text-sm px-2 sm:px-4"
                >
                  Finish Quiz
                  <Check className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Quiz control buttons */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            <Settings2 className="mr-2 h-4 w-4" />
            Back to Configuration
          </Button>

          {isQuizComplete && (
            <Button
              onClick={startQuiz}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              <Play className="mr-2 h-4 w-4" />
              Restart Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
