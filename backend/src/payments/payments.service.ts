// backend/src/payments/payments.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  // private stripe: Stripe;

  constructor(private configService: ConfigService) {
    // TODO: Wire up Stripe when account is ready
    // this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
    //   apiVersion: '2023-10-16',
    // });
  }

  async createCheckoutSession(
    items: Array<{ productId: string; quantity: number }>,
    userId: string,
  ) {
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

  async handleWebhook(payload: Buffer, signature: string) {
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
    } catch (err) {
      // TODO: Handle webhook errors when Stripe is set up
      // const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      // throw new Error(`Webhook Error: ${errorMessage}`);
      console.error('Webhook error (Stripe not yet configured):', err);
      return { received: false };
    }
  }

  // TODO: Uncomment and implement when Stripe is ready
  // private async handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  //   // Handle successful payment
  //   console.log('Payment successful:', session.id);
  // }
}