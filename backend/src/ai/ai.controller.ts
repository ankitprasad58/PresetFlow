// src/ai/ai.controller.ts
import { Controller, Post, Get, Body, Query, UseGuards, Request } from '@nestjs/common';
import { AIService } from './ai.service';
import { GenerateContentDto } from './dto/generate-content.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('generate')
  async generateContent(@Request() req: Request, @Body() dto: GenerateContentDto) {
  // If using Passport, req.user exists. You might need to cast:
  const user = (req as any).user;
  return this.aiService.generateContent(user.id, dto);
}

  @Get('conversations')
  async getConversations(
    @Request() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category?: string,
  ) {
    console.log('req.user:', req.user); // Add this line
    return this.aiService.getUserConversations(req.user.id, page, limit);
  }

  @Get('templates')
  async getTemplates() {
    return {
      templates: [
        {
          id: 'youtube-script',
          name: 'YouTube Script',
          description: 'Generate engaging YouTube video scripts',
          prompt: 'Write a YouTube script about [topic] with hooks, main content, and call-to-action',
          category: 'video',
        },
        // ... other templates
      ],
    };
  }
}