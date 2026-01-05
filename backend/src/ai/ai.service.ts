// src/ai/ai.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { GroqService } from './groq.service';
import { GenerateContentDto } from './dto/generate-content.dto';

@Injectable()
export class AIService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly groqService: GroqService,
  ) { }

  private templates: { [key: string]: { name: string; description: string; systemPrompt: string; userPrompt: string; } } = {
    'youtube-script': {
      name: 'YouTube Script',
      description: 'Generate engaging YouTube video scripts',
      systemPrompt: 'You are a professional YouTube script writer. Create engaging, conversational scripts that hook viewers in the first 15 seconds.',
      userPrompt: 'Write a YouTube script about: {prompt}',
    },
    'instagram-caption': {
      name: 'Instagram Caption',
      description: 'Create viral Instagram captions with hashtags',
      systemPrompt: 'You are a social media expert specializing in Instagram. Create catchy captions with relevant hashtags.',
      userPrompt: 'Write an Instagram caption for: {prompt}',
    },
    'blog-post': {
      name: 'Blog Article',
      description: 'Generate SEO-optimized blog posts',
      systemPrompt: 'You are a professional blogger and SEO specialist. Write comprehensive, well-structured blog posts.',
      userPrompt: 'Write a blog post about: {prompt}',
    },
    'podcast-script': {
      name: 'Podcast Script',
      description: 'Create podcast episode scripts',
      systemPrompt: 'You are a podcast producer. Create engaging podcast scripts with natural conversation flow.',
      userPrompt: 'Write a podcast script about: {prompt}',
    },
    // Add more templates as needed
  };

  async generateContent(userId: string, dto: GenerateContentDto) {
    // Check user credits
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    console.log(user);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.credits <= 0) {
      throw new HttpException('Insufficient credits', HttpStatus.PAYMENT_REQUIRED);
    }

    // Prepare prompt based on template
    let prompt = dto.prompt;
    let systemPrompt = 'You are a professional content creator.';
    
    if (dto.template && this.templates[dto.template]) {
      const template = this.templates[dto.template];
      systemPrompt = template.systemPrompt;
      prompt = template.userPrompt.replace('{prompt}', dto.prompt);
    }

    // Generate content using Groq
    const aiResponse = await this.groqService.generateContent(prompt, {
      systemPrompt,
      maxTokens: 1500,
      temperature: 0.7,
    });

    // Create or get conversation
    let conversation = await this.prisma.aIConversation.findFirst({
      where: {
        userId,
        status: 'draft',
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!conversation) {
      conversation = await this.prisma.aIConversation.create({
        data: {
          userId,
          title: `AI Content: ${dto.prompt.substring(0, 40)}${dto.prompt.length > 40 ? '...' : ''}`,
          category: this.detectCategory(dto.prompt),
          platform: dto.platform || 'AI Studio',
          status: 'draft',
          tags: this.extractTags(dto.prompt),
          wordCount: 0,
        },
      });
    }

    // Save user message
    await this.prisma.aIMessage.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content: dto.prompt,
      },
    });

    // Save AI response
    await this.prisma.aIMessage.create({
      data: {
        conversationId: conversation.id,
        role: 'assistant',
        content: aiResponse.content,
      },
    });

    // Update conversation
    const updatedConversation = await this.prisma.aIConversation.update({
      where: { id: conversation.id },
      data: {
        title: conversation.title,
        wordCount: conversation.wordCount + aiResponse.content.length,
        status: dto.status || 'completed',
        updatedAt: new Date(),
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    // Deduct credit
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        credits: { decrement: 1 },
        lastCreditDeductedAt: new Date(),
      },
    });

    return {
      conversation: updatedConversation,
      aiResponse,
      remainingCredits: updatedUser.credits,
    };
  }

  async getUserConversations(
    userId: string,
    page = 1,
    limit = 10,
    category?: string,
    search?: string,
  ) {
    process.exit();
    const skip = (page - 1) * limit;

    const where: any = { userId };
    
    if (category && category !== 'all') {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    const [conversations, total] = await Promise.all([
      this.prisma.aIConversation.findMany({
        where,
        include: {
          messages: {
            take: 2,
            orderBy: { createdAt: 'desc' },
          },
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.aIConversation.count({ where }),
    ]);

    return {
      conversations,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async getConversation(id: string, userId: string) {
    const conversation = await this.prisma.aIConversation.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);
    }

    return conversation;
  }

  async updateConversation(id: string, userId: string, data: any) {
    const conversation = await this.prisma.aIConversation.findFirst({
      where: { id, userId },
    });

    if (!conversation) {
      throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.aIConversation.update({
      where: { id },
      data: {
        title: data.title || conversation.title,
        category: data.category || conversation.category,
        status: data.status || conversation.status,
        tags: data.tags || conversation.tags,
        updatedAt: new Date(),
      },
    });
  }

  async deleteConversation(id: string, userId: string) {
    const conversation = await this.prisma.aIConversation.findFirst({
      where: { id, userId },
    });

    if (!conversation) {
      throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);
    }

    // Delete all messages
    await this.prisma.aIMessage.deleteMany({
      where: { conversationId: id },
    });

    // Delete the conversation
    await this.prisma.aIConversation.delete({
      where: { id },
    });

    return { success: true, message: 'Conversation deleted' };
  }

  private detectCategory(prompt: string): string {
    const promptLower = prompt.toLowerCase();
    if (promptLower.includes('youtube') || promptLower.includes('video') || promptLower.includes('script')) return 'video';
    if (promptLower.includes('instagram') || promptLower.includes('social') || promptLower.includes('caption')) return 'social';
    if (promptLower.includes('blog') || promptLower.includes('article') || promptLower.includes('post')) return 'writing';
    if (promptLower.includes('podcast') || promptLower.includes('audio')) return 'audio';
    if (promptLower.includes('email') || promptLower.includes('newsletter')) return 'marketing';
    return 'general';
  }

  // In your ai.service.ts, update the extractTags method:
  private extractTags(prompt: string): any {
    // Simple tag extraction
    const words = prompt.toLowerCase().split(' ');
    const commonWords = ['the', 'and', 'for', 'with', 'about', 'how', 'what', 'write', 'create', 'generate'];
    const filtered = words.filter(
      word => word.length > 3 &&
        !commonWords.includes(word) &&
        !word.includes('youtube') &&
        !word.includes('instagram') &&
        !word.includes('blog') &&
        !word.includes('podcast')
    );
    return [...new Set(filtered)].slice(0, 5);
  }
};