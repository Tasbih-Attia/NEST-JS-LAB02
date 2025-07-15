import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order/order';
import { PaymentMethod } from './order/order';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/orders/dto/create-order.dto/create-order.dto';
import { UpdateOrderDto } from './dto/orders/dto/update-order.dto/update-order.dto';
import { NotFoundException } from '@nestjs/common';



@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAll(clientId?: number, paymentMethod?: PaymentMethod): Promise<Order[]> {
    const query = this.orderRepository.createQueryBuilder('order');

    if (clientId) {
      query.andWhere('order.clientId = :clientId', { clientId });
    }

    if (paymentMethod) {
      query.andWhere('order.paymentMethod = :paymentMethod', { paymentMethod });
    }

    return query.getMany();
  }

  async getById(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    const newOrder = this.orderRepository.create(dto);
    return this.orderRepository.save(newOrder);
  }

  async update(id: string, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.getById(id);
    const updated = Object.assign(order, dto);
    return this.orderRepository.save(updated);
  }

  async delete(id: string): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Order not found');
  }
  
}
