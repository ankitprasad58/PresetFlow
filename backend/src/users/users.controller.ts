import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; name: string }) {
    return this.usersService.create(body.email, body.password, body.name);
  }
}
// src/users/users.controller.ts
// @Get('me')
// @UseGuards(JwtAuthGuard)
// async getProfile(@Request() req) {
//   const user = await this.usersService.findById(req.user.id);
//   return {
//     id: user.id,
//     email: user.email,
//     name: user.name,
//     credits: user.credits,
//     lastCreditDeductedAt: user.lastCreditDeductedAt,
//   };
// }