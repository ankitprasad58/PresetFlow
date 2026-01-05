// components/ai/AIStatsBar.tsx
import React from "react";

interface Conversation {
  id: string;
  wordCount: number;
  status: "draft" | "completed" | "archived";
  messages: any[];
}

interface AIStatsBarProps {
  conversations: Conversation[];
}

export const AIStatsBar: React.FC<AIStatsBarProps> = ({ conversations }) => {
  const totalConversations = conversations.length;
  const totalWords = conversations.reduce(
    (acc, conv) => acc + conv.wordCount,
    0
  );
  const completedConversations = conversations.filter(
    (c) => c.status === "completed"
  ).length;
  const totalMessages = conversations.reduce(
    (acc, conv) => acc + conv.messages.length,
    0
  );

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-lg border border-gray-700 rounded-2xl p-4 z-40">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {totalConversations}
          </div>
          <div className="text-xs text-gray-400">Conversations</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {totalWords.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">Words Generated</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {completedConversations}
          </div>
          <div className="text-xs text-gray-400">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {totalMessages}
          </div>
          <div className="text-xs text-gray-400">Messages</div>
        </div>
      </div>
    </div>
  );
};
