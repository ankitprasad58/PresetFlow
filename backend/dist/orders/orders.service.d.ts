import { PrismaService } from '../shared/prisma.service';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, totalAmount: number, items: any[]): Promise<{
        items: {
            id: string;
            createdAt: Date;
            price: number;
            productId: string;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalAmount: number;
        status: string;
        stripePaymentId: string | null;
        stripeSessionId: string | null;
        userId: string;
    }>;
    findBySessionId(sessionId: string): Promise<({
        items: {
            id: string;
            createdAt: Date;
            price: number;
            productId: string;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalAmount: number;
        status: string;
        stripePaymentId: string | null;
        stripeSessionId: string | null;
        userId: string;
    }) | null>;
    updateStatus(orderId: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalAmount: number;
        status: string;
        stripePaymentId: string | null;
        stripeSessionId: string | null;
        userId: string;
    }>;
}
//# sourceMappingURL=orders.service.d.ts.map