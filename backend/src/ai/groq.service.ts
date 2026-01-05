// src/ai/groq.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

interface GroqOptions {
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}

@Injectable()
export class GroqService {
  private readonly apiKey: string;
  private readonly baseURL = 'https://api.groq.com/openai/v1';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('GROQ_API_KEY') || '';
    if (!this.apiKey) {
      throw new Error('GROQ_API_KEY is not configured');
    }
  }

  async generateContent(prompt: string, options: GroqOptions = {}) {
    try {
      const startTime = Date.now();
      
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.baseURL}/chat/completions`,
          {
            model: 'llama-3.3-70b-versatile',
            max_tokens: options.maxTokens || 1500,
            temperature: options.temperature || 0.7,
            messages: [
              {
                role: 'system',
                content: options.systemPrompt || 'You are a helpful AI assistant.',
              },
              { role: 'user', content: prompt },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.apiKey}`,
            },
          },
        ),
      );

      const endTime = Date.now();
      
      return {
        content: response.data.choices[0].message.content,
        tokensUsed: response.data.usage?.total_tokens || 0,
        model: response.data.model,
        processingTime: endTime - startTime,
      };
    } catch (error: any) {
      console.error('Groq API Error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        throw new HttpException(
          'Invalid API key configuration',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (error.response?.status === 429) {
        throw new HttpException(
          'Rate limit exceeded. Please try again later.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      
      throw new HttpException(
        'Failed to generate content from AI service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}