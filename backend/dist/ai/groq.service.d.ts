import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
interface GroqOptions {
    systemPrompt?: string;
    maxTokens?: number;
    temperature?: number;
}
export declare class GroqService {
    private readonly httpService;
    private readonly configService;
    private readonly apiKey;
    private readonly baseURL;
    constructor(httpService: HttpService, configService: ConfigService);
    generateContent(prompt: string, options?: GroqOptions): Promise<{
        content: any;
        tokensUsed: any;
        model: any;
        processingTime: number;
    }>;
}
export {};
//# sourceMappingURL=groq.service.d.ts.map