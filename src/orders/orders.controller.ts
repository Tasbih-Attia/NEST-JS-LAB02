import { Controller, Post, Body, Param, Get, ParseIntPipe, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/orders/dto/create-order.dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() body: {
    amount: number;
    longitude: number;
    latitude: number;
    clientId: number;
    paymentMethod: 'Cash' | 'Visa';
    productIds: number[];
  }) {
    return this.ordersService.createOrder(body);
  }


  @Post()
@UseGuards(JwtAuthGuard)
createOrder(@Req() req: any, @Body() body: CreateOrderDto) {
  const userId = req.user['userId']; 
  return this.ordersService.createOrderWithUser(userId, body);
}


  

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOrderDetails(id);
  }

  @UseGuards(JwtAuthGuard)
   @Get()
   findAll() {
    return this.ordersService.getAll();
  }
}
