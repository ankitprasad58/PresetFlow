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
exports.PaymentsService = void 0;
// backend/src/payments/payments.service.ts
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
// import Stripe from 'stripe';
let PaymentsService = class PaymentsService {
    // private stripe: Stripe;
    constructor(configService) {
        this.configService = configService;
        // TODO: Wire up Stripe when account is ready
        // this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
        //   apiVersion: '2023-10-16',
        // });
    }
    async createCheckoutSession(items, userId) {
        // TODO: Implement Stripe checkout session
        // const lineItems = items.map((item) => ({
        //   price_data: {
        //     currency: 'usd',
        //     product_data: {
        //       name: item.productId,
        //     },
        //     unit_amount: 9900,
        //   },
        //   quantity: item.quantity,
        // }));
        // const session = await this.stripe.checkout.sessions.create({
        //   payment_method_types: ['card'],
        //   line_items: lineItems,
        //   mode: 'payment',
        //   success_url: `${this.configService.get('FRONTEND_URL')}/success`,
        //   cancel_url: `${this.configService.get('FRONTEND_URL')}/checkout`,
        // });
        // return { sessionId: session.id };
        return { sessionId: 'temp_session_id' };
    }
    async handleWebhook(payload, signature) {
        try {
            // TODO: Implement Stripe webhook handling
            // const event = this.stripe.webhooks.constructEvent(
            //   payload,
            //   signature,
            //   this.configService.get('STRIPE_WEBHOOK_SECRET'),
            // );
            // if (event.type === 'checkout.session.completed') {
            //   await this.handleSuccessfulPayment(event.data.object);
            // }
            return { received: true };
        }
        catch (err) {
            // TODO: Handle webhook errors when Stripe is set up
            // const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            // throw new Error(`Webhook Error: ${errorMessage}`);
            console.error('Webhook error (Stripe not yet configured):', err);
            return { received: false };
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map