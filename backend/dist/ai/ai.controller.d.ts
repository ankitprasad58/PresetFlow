import { AIService } from './ai.service';
import { GenerateContentDto } from './dto/generate-content.dto';
export declare class AIController {
    private readonly aiService;
    constructor(aiService: AIService);
    generateContent(req: Request, dto: GenerateContentDto): Promise<{
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
    getConversations(req: any, page?: number, limit?: number, category?: string): Promise<{
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
    getTemplates(): Promise<{
        templates: {
            id: string;
            name: string;
            description: string;
            prompt: string;
            category: string;
        }[];
    }>;
}
//# sourceMappingURL=ai.controller.d.ts.map