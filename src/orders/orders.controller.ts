import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order, PaymentMethod } from './order/order';
import { CreateOrderDto } from './dto/orders/dto/create-order.dto/create-order.dto';
import { UpdateOrderDto } from './dto/orders/dto/update-order.dto/update-order.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getAllOrders(
    @Query('clientId') clientId?: number,
    @Query('paymentMethod') paymentMethod?: PaymentMethod,
  ): Promise<Order[]> {
    return this.ordersService.getAll(clientId, paymentMethod);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.ordersService.delete(id);
  }
}

