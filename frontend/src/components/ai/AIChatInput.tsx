// components/ai/AIChatInput.tsx
import React, { useState } from "react";
import { Send } from "lucide-react";

interface AIChatInputProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
}

export const AIChatInput: React.FC<AIChatInputProps> = ({
  onSendMessage,
  loading,
}) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (!inputMessage.trim() || loading) return;
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "Blog post about AI",
    "YouTube description",
    "Twitter thread",
    "Email newsletter",
  ];

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-b-2xl p-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe the content you want to create..."
          className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !inputMessage.trim()}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-sm text-gray-400">Quick prompts:</span>
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setInputMessage(prompt)}
            className="text-sm px-3 py-1 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
