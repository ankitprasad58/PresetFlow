// src/ai/interfaces/ai-response.interface.ts
export interface AIResponse {
  content: string;
  tokensUsed: number;
  model: string;
  processingTime: number;
}