import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, totalAmount: number, items: any[]) {
    return this.prisma.order.create({
      data: {
        userId,
        totalAmount,
        items: {
          create: items,
        },
      },
      include: { items: true },
    });
  }

  async findBySessionId(sessionId: string) {
    return this.prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
      include: { items: true },
    });
  }

  async updateStatus(orderId: string, status: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}