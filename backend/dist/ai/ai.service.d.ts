import { PrismaService } from '../shared/prisma.service';
import { GroqService } from './groq.service';
import { GenerateContentDto } from './dto/generate-content.dto';
export declare class AIService {
    private readonly prisma;
    private readonly groqService;
    constructor(prisma: PrismaService, groqService: GroqService);
    private templates;
    generateContent(userId: string, dto: GenerateContentDto): Promise<{
        conversation: {
            messages: {
                id: string;
                createdAt: Date;
                role: string;
                content: string;
                conversationId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category: string;
            status: string;
            userId: string;
            platform: string;
            title: string;
            wordCount: number;
            tags: import("@prisma/client/runtime/library").JsonValue;
        };
        aiResponse: {
            content: any;
            tokensUsed: any;
            model: any;
            processingTime: number;
        };
        remainingCredits: number;
    }>;
    getUserConversations(userId: string, page?: number, limit?: number, category?: string, search?: string): Promise<{
        conversations: ({
            messages: {
                id: string;
                createdAt: Date;
                role: string;
                content: string;
                conversationId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category: string;
            status: string;
            userId: string;
            platform: string;
            title: string;
            wordCount: number;
            tags: import("@prisma/client/runtime/library").JsonValue;
        })[];
        total: number;
        page: number;
        pages: number;
    }>;
    getConversation(id: string, userId: string): Promise<{
        messages: {
            id: string;
            createdAt: Date;
            role: string;
            content: string;
            conversationId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        status: string;
        userId: string;
        platform: string;
        title: string;
        wordCount: number;
        tags: import("@prisma/client/runtime/library").JsonValue;
    }>;
    updateConversation(id: string, userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        status: string;
        userId: string;
        platform: string;
        title: string;
        wordCount: number;
        tags: import("@prisma/client/runtime/library").JsonValue;
    }>;
    deleteConversation(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    private detectCategory;
    private extractTags;
}
//# sourceMappingURL=ai.service.d.ts.map