// hooks/useAIChat.ts
import { useState, useCallback } from 'react';
import { aiService } from '../services/aiService';
import toast from 'react-hot-toast';

interface UseAIChatProps {
  userId: string;
}

export const useAIChat = ({ userId }: UseAIChatProps) => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

  const generateContent = useCallback(async (prompt: string, template?: string) => {
    setLoading(true);
    try {
      const response = await aiService.generateContent({
        prompt,
        template,
        userId,
      });
      
      // Update conversations
      setConversations(prev => [response.conversation, ...prev]);
      setActiveConversation(response.conversation);
      
      toast.success('Content generated successfully!');
      return response;
    } catch (error) {
      toast.error(error.message || 'Failed to generate content');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const loadConversations = useCallback(async (page = 1) => {
    try {
      const response = await aiService.getConversations(page);
      setConversations(response.conversations);
      return response;
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  }, []);

  const selectConversation = useCallback(async (conversationId: string) => {
    try {
      const conversation = await aiService.getConversation(conversationId);
      setActiveConversation(conversation);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  }, []);

  return {
    loading,
    conversations,
    activeConversation,
    generateContent,
    loadConversations,
    selectConversation,
    setActiveConversation,
  };
};