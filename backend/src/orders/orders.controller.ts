import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.ordersService.findBySessionId(id);
  }
}