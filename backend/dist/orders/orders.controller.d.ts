import { OrdersService } from './orders.service';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getOrder(id: string): Promise<({
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
}
//# sourceMappingURL=orders.controller.d.ts.map