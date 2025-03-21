"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { MCQProvider } from "./_lib/MCQContext";
import { Quiz } from "./_lib/quiz";
import { Settings } from "./_lib/settings";

export default function MCQPage() {
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <MCQProvider>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Multiple Choice Quiz</h1>

          <Tabs defaultValue="settings" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>

            <TabsContent value="settings">
              <Settings />
            </TabsContent>

            <TabsContent value="quiz">
              <Quiz />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MCQProvider>
  );
}
