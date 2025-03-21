"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMCQSettings } from "./_lib/use-mcq-settings";
import { Settings } from "./_lib/settings";
import { Quiz } from "./_lib/quiz";

export default function MCQPage() {
  const { settings, updateSettings, settingsJson, isLoaded } = useMCQSettings();
  const [activeTab, setActiveTab] = useState("settings");

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Multiple Choice Quiz</h1>

        <Tabs defaultValue="settings" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <Settings
              settings={settings}
              settingsJson={settingsJson}
              onSettingsChange={updateSettings}
            />
          </TabsContent>

          <TabsContent value="quiz">
            <Quiz settings={settings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
