import { ConfigService } from '@nestjs/config';
export declare class PaymentsService {
    private configService;
    constructor(configService: ConfigService);
    createCheckoutSession(items: Array<{
        productId: string;
        quantity: number;
    }>, userId: string): Promise<{
        sessionId: string;
    }>;
    handleWebhook(payload: Buffer, signature: string): Promise<{
        received: boolean;
    }>;
}
//# sourceMappingURL=payments.service.d.ts.map