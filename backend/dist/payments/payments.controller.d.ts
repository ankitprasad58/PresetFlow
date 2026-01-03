import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    createCheckout(body: {
        items: Array<{
            productId: string;
            quantity: number;
        }>;
    }): Promise<{
        sessionId: string;
    }>;
    handleWebhook(signature: string, rawBody: Buffer): Promise<{
        received: boolean;
    }>;
}
//# sourceMappingURL=payments.controller.d.ts.map