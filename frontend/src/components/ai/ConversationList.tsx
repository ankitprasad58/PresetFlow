// components/ai/ConversationList.tsx
import React from "react";
import { motion } from "framer-motion";
import { Clock, Filter, Search, MessageSquare } from "lucide-react";

interface Conversation {
  id: string;
  title: string;
  category: string;
  platform: string;
  status: "draft" | "completed" | "archived";
  updatedAt: Date;
  tags: string[];
  wordCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onNewConversation: () => void;
}

const categories = [
  { id: "all", name: "All Conversations" },
  { id: "video", name: "Video Content" },
  { id: "social", name: "Social Media" },
  { id: "writing", name: "Writing" },
  { id: "audio", name: "Audio" },
  { id: "planning", name: "Planning" },
];

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversation,
  onSelectConversation,
  onNewConversation,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || conv.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Categories */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Categories
          </h3>
          <span className="text-sm text-gray-400">
            {filteredConversations.length} items
          </span>
        </div>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                selectedCategory === cat.id
                  ? "bg-purple-900/50 text-purple-300"
                  : "hover:bg-gray-700/50"
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-xs px-2 py-0.5 bg-gray-900 rounded-full">
                {cat.id === "all"
                  ? conversations.length
                  : conversations.filter((c) => c.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Conversations */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent
          </h3>
          <button className="text-sm text-purple-400 hover:text-purple-300">
            View All
          </button>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {filteredConversations.map((conv) => (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => onSelectConversation(conv)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                activeConversation?.id === conv.id
                  ? "bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-700/50"
                  : "bg-gray-900/50 hover:bg-gray-700/50 border border-transparent hover:border-gray-600"
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-semibold text-sm line-clamp-1">
                  {conv.title}
                </h4>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    conv.status === "completed"
                      ? "bg-green-900/50 text-green-300"
                      : conv.status === "draft"
                      ? "bg-yellow-900/50 text-yellow-300"
                      : "bg-gray-900/50 text-gray-300"
                  }`}
                >
                  {conv.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{conv.platform}</span>
                <span className="text-xs text-gray-500">
                  {new Date(conv.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {conv.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-gray-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {conv.tags.length > 2 && (
                  <span className="text-xs px-2 py-0.5 bg-gray-800 rounded-full">
                    +{conv.tags.length - 2}
                  </span>
                )}
              </div>
            </motion.div>
          ))}

          {filteredConversations.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No conversations yet</p>
              <p className="text-sm">Start by creating new content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
