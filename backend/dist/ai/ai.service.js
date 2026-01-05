"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
// src/ai/ai.service.ts
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../shared/prisma.service");
const groq_service_1 = require("./groq.service");
let AIService = class AIService {
    constructor(prisma, groqService) {
        this.prisma = prisma;
        this.groqService = groqService;
        this.templates = {
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
    }
    async generateContent(userId, dto) {
        // Check user credits
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        console.log(user);
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (user.credits <= 0) {
            throw new common_1.HttpException('Insufficient credits', common_1.HttpStatus.PAYMENT_REQUIRED);
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
    async getUserConversations(userId, page = 1, limit = 10, category, search) {
        process.exit();
        const skip = (page - 1) * limit;
        const where = { userId };
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
    async getConversation(id, userId) {
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
            throw new common_1.HttpException('Conversation not found', common_1.HttpStatus.NOT_FOUND);
        }
        return conversation;
    }
    async updateConversation(id, userId, data) {
        const conversation = await this.prisma.aIConversation.findFirst({
            where: { id, userId },
        });
        if (!conversation) {
            throw new common_1.HttpException('Conversation not found', common_1.HttpStatus.NOT_FOUND);
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
    async deleteConversation(id, userId) {
        const conversation = await this.prisma.aIConversation.findFirst({
            where: { id, userId },
        });
        if (!conversation) {
            throw new common_1.HttpException('Conversation not found', common_1.HttpStatus.NOT_FOUND);
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
    detectCategory(prompt) {
        const promptLower = prompt.toLowerCase();
        if (promptLower.includes('youtube') || promptLower.includes('video') || promptLower.includes('script'))
            return 'video';
        if (promptLower.includes('instagram') || promptLower.includes('social') || promptLower.includes('caption'))
            return 'social';
        if (promptLower.includes('blog') || promptLower.includes('article') || promptLower.includes('post'))
            return 'writing';
        if (promptLower.includes('podcast') || promptLower.includes('audio'))
            return 'audio';
        if (promptLower.includes('email') || promptLower.includes('newsletter'))
            return 'marketing';
        return 'general';
    }
    // In your ai.service.ts, update the extractTags method:
    extractTags(prompt) {
        // Simple tag extraction
        const words = prompt.toLowerCase().split(' ');
        const commonWords = ['the', 'and', 'for', 'with', 'about', 'how', 'what', 'write', 'create', 'generate'];
        const filtered = words.filter(word => word.length > 3 &&
            !commonWords.includes(word) &&
            !word.includes('youtube') &&
            !word.includes('instagram') &&
            !word.includes('blog') &&
            !word.includes('podcast'));
        return [...new Set(filtered)].slice(0, 5);
    }
};
exports.AIService = AIService;
exports.AIService = AIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        groq_service_1.GroqService])
], AIService);
;
//# sourceMappingURL=ai.service.js.map