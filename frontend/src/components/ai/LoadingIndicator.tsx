// components/ai/LoadingIndicator.tsx
import React from "react";
import { Bot } from "lucide-react";

export const LoadingIndicator: React.FC = () => (
  <div className="flex gap-3">
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
      <Bot className="w-4 h-4" />
    </div>
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
        <span className="text-sm">Generating content...</span>
      </div>
    </div>
  </div>
);
