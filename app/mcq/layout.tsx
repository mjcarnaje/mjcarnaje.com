"use client";

import { QuizletProvider } from "./_lib/quizlet-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <QuizletProvider>{children}</QuizletProvider>;
}
