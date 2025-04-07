"use client";

import { useState, useEffect } from "react";
import { useQuizlet } from "../_lib/quizlet-context";
import { QuestionItem, PracticeModeConfig } from "../_lib/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  HelpCircle,
  CheckCircle2,
  Play,
  Settings2,
  Eye,
  EyeOff,
} from "lucide-react";
import { shuffle } from "@/lib/utils";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Page() {
  const { questions, practiceModeConfig, handlePracticeModeConfigChange } =
    useQuizlet();
  const [activeCards, setActiveCards] = useState<QuestionItem[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(true);
  const [config, setConfig] = useState<PracticeModeConfig>({
    ...practiceModeConfig,
  });

  // Initialize the active cards when starting practice
  const startPractice = () => {
    if (questions.length > 0) {
      let initialCards = [...questions];
      if (config.randomizeQuestions) {
        initialCards = shuffle(initialCards);
      }
      setActiveCards(initialCards);
      setCurrentCardIndex(0);
      setCompleted(false);
      setIsConfiguring(false);

      // Save the configuration
      handlePracticeModeConfigChange(config);
    }
  };

  const handleCardClick = () => {
    if (!showAnswer && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setShowAnswer(true);
        setShowExplanation(config.showExplanationImmediately);
        setTimeout(() => {
          setIsFlipping(false);
        }, 150);
      }, 150);
    }
  };

  const handleStillLearning = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowAnswer(false);
      setShowExplanation(false);

      // Move to the next card
      const nextIndex = currentCardIndex + 1;
      if (nextIndex < activeCards.length) {
        setCurrentCardIndex(nextIndex);
      } else {
        // If we've reached the end, start over
        setCurrentCardIndex(0);
      }

      setTimeout(() => {
        setIsFlipping(false);
      }, 150);
    }, 150);
  };

  const handleKnewIt = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowAnswer(false);
      setShowExplanation(false);

      // Remove the current card from the active set
      const updatedCards = activeCards.filter(
        (_, index) => index !== currentCardIndex
      );
      setActiveCards(updatedCards);

      // Check if there are any cards left
      if (updatedCards.length === 0) {
        setCompleted(true);
        setIsFlipping(false);
      } else {
        // Adjust the current index if needed
        const nextIndex =
          currentCardIndex >= updatedCards.length ? 0 : currentCardIndex;
        setCurrentCardIndex(nextIndex);
        setTimeout(() => {
          setIsFlipping(false);
        }, 150);
      }
    }, 150);
  };

  const resetPractice = () => {
    setIsConfiguring(true);
    setCompleted(false);
  };

  // Define currentCard
  const currentCard = activeCards[currentCardIndex];

  if (isConfiguring) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Practice Mode</h1>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              What is Practice Mode?
            </h2>
            <p className="text-gray-600 mb-4">
              Practice Mode helps you master content through an adaptive
              flashcard system. Here&apos;s how it works:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
              <li>Questions appear one at a time as flashcards</li>
              <li>Click/tap a card to reveal the answer</li>
              <li>After seeing the answer, choose either:</li>
              <ul className="list-circle pl-5 space-y-1 mt-1">
                <li>
                  <strong>Still Learning</strong> - Keep the card in rotation
                  for more practice
                </li>
                <li>
                  <strong>I Knew It</strong> - Remove the card from the active
                  set
                </li>
              </ul>
              <li>Continue until you&apos;ve successfully learned all cards</li>
            </ul>

            <p className="text-gray-600 italic mb-6">
              This spaced repetition approach focuses your study time on
              material you find challenging, making learning more efficient.
            </p>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="randomize-questions">
                    Randomize Questions
                  </Label>
                  <p className="text-sm text-gray-500">
                    Shuffles the order of questions each time you practice
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
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-explanation-immediately">
                    Show Explanation Immediately
                  </Label>
                  <p className="text-sm text-gray-500">
                    Shows the explanation immediately after you answer the
                    question
                  </p>
                </div>
                <Switch
                  id="show-explanation-immediately"
                  checked={config.showExplanationImmediately}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      showExplanationImmediately: checked,
                    }))
                  }
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-between">
            <Button asChild variant="outline">
              <Link href="/mcq">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Button onClick={startPractice} className="px-8">
              <Play className="mr-2 h-4 w-4" />
              Start Practice
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">Practice Complete!</h1>
          <p className="text-gray-600 mb-6">
            You&apos;ve successfully learned all the cards in this session.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => {
                let cards = [...questions];
                if (config.randomizeQuestions) {
                  cards = shuffle(cards);
                }
                setActiveCards(cards);
                setCurrentCardIndex(0);
                setCompleted(false);
              }}
            >
              Practice Again
            </Button>
            <Button onClick={resetPractice} variant="outline">
              <Settings2 className="mr-2 h-4 w-4" />
              Configure
            </Button>
            <Button asChild variant="outline">
              <Link href="/mcq">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Menu
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return <div>Loading...</div>;
  }

  const correctAnswer = currentCard.options[currentCard.answer];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Practice Mode</h1>
          <p className="text-gray-600">Cards remaining: {activeCards.length}</p>
        </div>
        <Button onClick={resetPractice} size="sm" variant="outline">
          <Settings2 className="mr-2 h-4 w-4" />
          Configure
        </Button>
      </div>

      <div className="perspective-1000 mb-6 h-[300px]">
        <div
          className={`relative w-full h-full transition-transform duration-300 transform-style-preserve-3d ${
            isFlipping ? "scale-95" : ""
          } ${showAnswer ? "rotate-y-180" : ""}`}
          onClick={handleCardClick}
        >
          {/* Front of card (Question) */}
          <Card className="absolute w-full h-full p-6 cursor-pointer backface-hidden flex items-center justify-center">
            <h2 className="text-xl font-semibold text-center">
              {currentCard.question}
            </h2>
          </Card>

          {/* Back of card (Answer) */}
          <Card className="absolute w-full h-full p-6 cursor-pointer backface-hidden rotate-y-180 flex flex-col items-center justify-center bg-gray-50">
            <div className="text-center">
              <h3 className="font-medium mb-4">Answer:</h3>
              <div className="p-4 rounded-md bg-green-100 border border-green-300 mb-4">
                <p className="font-medium">{correctAnswer}</p>
              </div>

              {currentCard.explanation && (
                <>
                  {!config.showExplanationImmediately && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowExplanation(!showExplanation);
                      }}
                      className="mt-2 mb-2"
                    >
                      {showExplanation ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Hide Explanation
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Show Explanation
                        </>
                      )}
                    </Button>
                  )}
                  {showExplanation && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-md">
                      <p className="text-sm">{currentCard.explanation}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>
      </div>

      {showAnswer && (
        <div className="flex space-x-4">
          <Button
            onClick={handleStillLearning}
            variant="outline"
            className="flex-1 py-6"
          >
            <HelpCircle className="mr-2 h-5 w-5" />
            Still Learning
          </Button>
          <Button onClick={handleKnewIt} className="flex-1 py-6">
            <CheckCircle2 className="mr-2 h-5 w-5" />I Knew It
          </Button>
        </div>
      )}
    </div>
  );
}
