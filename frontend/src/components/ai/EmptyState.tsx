// components/ai/EmptyState.tsx
import React from "react";
import { MessageSquare } from "lucide-react";

interface EmptyStateProps {
  onSelectExample: (example: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectExample }) => (
  <div className="text-center py-12">
    <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
    <h3 className="text-xl font-bold mb-2">Start a Conversation</h3>
    <p className="text-gray-400 mb-6">
      Type your request below to generate content
    </p>
    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      <button
        onClick={() =>
          onSelectExample(
            "Write a YouTube video script about sustainable living"
          )
        }
        className="p-3 bg-gray-800/50 rounded-lg text-sm hover:bg-gray-700/50 transition-colors"
      >
        "Sustainable living" video script
      </button>
      <button
        onClick={() =>
          onSelectExample("Create Instagram captions for fitness motivation")
        }
        className="p-3 bg-gray-800/50 rounded-lg text-sm hover:bg-gray-700/50 transition-colors"
      >
        Fitness captions
      </button>
    </div>
  </div>
);
