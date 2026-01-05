// components/ai/MessageBubble.tsx
import { motion } from "framer-motion";
import { Bot, User, Copy, Edit2, Download } from "lucide-react";

interface MessageBubbleProps {
  message: {
    role: "user" | "assistant";
    content: string;
    createdAt: string;
  };
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "justify-end" : ""}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isUser
            ? "bg-gradient-to-r from-purple-600 to-blue-600"
            : "bg-gray-800/50 border border-gray-700"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">
            {isUser ? "You" : "Content AI"}
          </span>
          <span className="text-xs opacity-70">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="whitespace-pre-wrap">{message.content}</div>

        {!isUser && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-700/50">
            <button className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">
              <Copy className="w-3 h-3 inline mr-1" />
              Copy
            </button>
            <button className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">
              <Edit2 className="w-3 h-3 inline mr-1" />
              Edit
            </button>
            <button className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">
              <Download className="w-3 h-3 inline mr-1" />
              Export
            </button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4" />
        </div>
      )}
    </motion.div>
  );
};
