import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order';
import { Product } from '../products/product';
import { User } from '../users/user';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
