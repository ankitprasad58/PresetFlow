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
exports.GroqService = void 0;
// src/ai/groq.service.ts
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let GroqService = class GroqService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.baseURL = 'https://api.groq.com/openai/v1';
        this.apiKey = this.configService.get('GROQ_API_KEY') || '';
        if (!this.apiKey) {
            throw new Error('GROQ_API_KEY is not configured');
        }
    }
    async generateContent(prompt, options = {}) {
        try {
            const startTime = Date.now();
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.baseURL}/chat/completions`, {
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
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.apiKey}`,
                },
            }));
            const endTime = Date.now();
            return {
                content: response.data.choices[0].message.content,
                tokensUsed: response.data.usage?.total_tokens || 0,
                model: response.data.model,
                processingTime: endTime - startTime,
            };
        }
        catch (error) {
            console.error('Groq API Error:', error.response?.data || error.message);
            if (error.response?.status === 401) {
                throw new common_1.HttpException('Invalid API key configuration', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else if (error.response?.status === 429) {
                throw new common_1.HttpException('Rate limit exceeded. Please try again later.', common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
            throw new common_1.HttpException('Failed to generate content from AI service', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.GroqService = GroqService;
exports.GroqService = GroqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], GroqService);
//# sourceMappingURL=groq.service.js.map