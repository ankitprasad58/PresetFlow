// components/ai/AIConversationHeader.tsx
import React from "react";
import { Save, Copy, Download, Sparkles } from "lucide-react";

interface Conversation {
  id: string;
  title: string;
  platform: string;
  wordCount: number;
  updatedAt: Date;
}

interface AIConversationHeaderProps {
  conversation: Conversation | null;
  onSave: () => void;
  onCopy: () => void;
  onExport: () => void;
}

export const AIConversationHeader: React.FC<AIConversationHeaderProps> = ({
  conversation,
  onSave,
  onCopy,
  onExport,
}) => {
  if (!conversation) {
    return (
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-t-2xl p-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          New Content Creation
        </h2>
        <p className="text-gray-400">
          Start a new conversation or use a template
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-t-2xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{conversation.title}</h2>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>{conversation.platform}</span>
            <span>•</span>
            <span>{conversation.wordCount} words</span>
            <span>•</span>
            <span>
              Updated {new Date(conversation.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSave}
            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            title="Save"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={onCopy}
            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            title="Copy Content"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={onExport}
            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            title="Export"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
