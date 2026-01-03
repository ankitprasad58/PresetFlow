import { Controller, Post, Body, Headers } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create-checkout')
  async createCheckout(
    @Body() body: { items: Array<{ productId: string; quantity: number }> },
  ) {
    const userId = 'user-id'; // TODO: Get from auth guard
    return this.paymentsService.createCheckoutSession(body.items, userId);
  }

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Body() rawBody: Buffer,
  ) {
    // TODO: Wire up when Stripe is configured
    return this.paymentsService.handleWebhook(rawBody, signature);
  }
}