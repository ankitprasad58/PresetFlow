// pages/AIContent.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { ConversationList } from "../components/ai/ConversationList";
import { TemplateGrid } from "../components/ai/TemplateGrid";
import { AIChatInput } from "../components/ai/AIChatInput";
import { AIConversationHeader } from "../components/ai/AIConversationHeader";
import { AIStatsBar } from "../components/ai/AIStatsBar";
import { MessageBubble } from "../components/ai/MessageBubble";
import { LoadingIndicator } from "../components/ai/LoadingIndicator";
import { EmptyState } from "../components/ai/EmptyState";
import { Brain, Plus, MoreVertical } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AIContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Add this line
  const [showTemplates, setShowTemplates] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string>();
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState<number>(5);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

  // Improved getAuthToken: prefer a single key and handle missing token
  const getAuthToken = () => {
    return localStorage.getItem("access_token") || "";
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!getAuthToken()) {
      toast.error("Please log in to access AI Content Studio.");
      navigate("/auth");
    }
  }, [navigate]);

  const loadConversations = useCallback(async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE}/ai/conversations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConversations(response.data.conversations || []);
    } catch (error) {
      console.error("Failed to load conversations:", error);
      toast.error("Failed to load conversations");
    }
  }, [API_BASE]);

  const loadCredits = useCallback(async () => {
    try {
      const token = getAuthToken();
      // This endpoint might not exist yet, we'll create it
      const response = await axios.get(`${API_BASE}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCredits(response.data.credits || 0);
    } catch (error) {
      console.error("Failed to load credits:", error);
    }
  }, [API_BASE]);

  const generateContent = async (prompt: string, templateId?: string) => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await axios.post(
        `${API_BASE}/ai/generate`,
        {
          prompt,
          template: templateId,
          platform: "AI Studio",
          status: "draft",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { conversation, remainingCredits } = response.data;

      // Update conversations list
      setConversations((prev) => [conversation, ...prev]);
      setActiveConversation(conversation);

      // Update credits
      if (remainingCredits !== undefined) {
        setCredits(remainingCredits);
      }

      setShowTemplates(false);
      toast.success("Content generated successfully!");
      return response.data;
    } catch (error: any) {
      console.error("Error generating content:", error);
      if (error.response?.status === 402) {
        toast.error("Insufficient credits. Please purchase more.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to generate content");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (message: string, templateId?: string) => {
    await generateContent(message, templateId);
  };

  const handleSelectConversation = async (conversation: any) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(
        `${API_BASE}/ai/conversations/${conversation.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setActiveConversation(response.data);
      setShowTemplates(false);
    } catch (error) {
      console.error("Failed to load conversation:", error);
      toast.error("Failed to load conversation");
    }
  };

  const handleNewConversation = () => {
    setActiveConversation(null);
    setSelectedTemplate(undefined);
    setShowTemplates(true);
  };

  const handleUseTemplate = (prompt: string, templateId?: string) => {
    setSelectedTemplate(templateId);
    // Pre-fill the input with template prompt
    const input = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    if (input) {
      input.value = prompt;
      input.focus();
    }
    toast.success(`Template loaded! Click send or press Enter to generate.`);
  };

  const handleSave = async () => {
    if (!activeConversation) return;

    try {
      const token = getAuthToken();
      await axios.patch(
        `${API_BASE}/ai/conversations/${activeConversation.id}`,
        {
          title: activeConversation.title,
          status: "completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Conversation saved!");
    } catch (error) {
      console.error("Failed to save conversation:", error);
      toast.error("Failed to save conversation");
    }
  };

  const handleCopy = () => {
    if (activeConversation?.messages) {
      const content = activeConversation.messages
        .map((m: any) => m.content)
        .join("\n\n");
      navigator.clipboard.writeText(content);
      toast.success("Content copied to clipboard!");
    }
  };

  const handleExport = () => {
    toast.success("Export feature coming soon!");
  };

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      const token = getAuthToken();
      await axios.delete(`${API_BASE}/ai/conversations/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConversations((prev) =>
        prev.filter((conv) => conv.id !== conversationId)
      );
      if (activeConversation?.id === conversationId) {
        setActiveConversation(null);
        setShowTemplates(true);
      }
      toast.success("Conversation deleted");
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      toast.error("Failed to delete conversation");
    }
  };

  useEffect(() => {
    loadConversations();
    loadCredits();
  }, [loadConversations, loadCredits]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header with Credits */}
      <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <div className="relative">
                  <Brain className="w-8 h-8 text-purple-500" />
                  <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-30"></div>
                </div>
                <span>AI Content Studio</span>
              </h1>
              <p className="text-gray-400 mt-1">
                Generate, edit, and manage all your content in one place
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-700/50 rounded-xl px-4 py-2">
                <div className="text-sm text-gray-300">Credits</div>
                <div className="text-2xl font-bold text-white">{credits}</div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleNewConversation}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  New Content
                </button>

                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <ConversationList
              conversations={conversations}
              activeConversation={activeConversation}
              onSelectConversation={handleSelectConversation}
              onNewConversation={handleNewConversation}
              onDeleteConversation={handleDeleteConversation}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex flex-col h-[calc(100vh-180px)]">
              {/* Header */}
              <AIConversationHeader
                conversation={activeConversation}
                onSave={handleSave}
                onCopy={handleCopy}
                onExport={handleExport}
                onDelete={() =>
                  activeConversation &&
                  handleDeleteConversation(activeConversation.id)
                }
              />

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto bg-gray-800/10 border-x border-gray-700/50 p-4">
                {showTemplates && !activeConversation ? (
                  <TemplateGrid onSelectTemplate={handleUseTemplate} />
                ) : activeConversation?.messages ? (
                  <div className="space-y-6">
                    {activeConversation.messages.map(
                      (message: any, index: number) => (
                        <MessageBubble
                          key={message.id || index}
                          message={message}
                        />
                      )
                    )}
                    {loading && <LoadingIndicator />}
                  </div>
                ) : (
                  <EmptyState onSelectExample={handleUseTemplate} />
                )}
              </div>

              {/* Input */}
              <AIChatInput
                onSendMessage={handleSendMessage}
                loading={loading}
                selectedTemplate={selectedTemplate}
              />
            </div>
          </div>
        </div>
      </div>

      <AIStatsBar conversations={conversations} />
    </div>
  );
};

export default AIContent;
