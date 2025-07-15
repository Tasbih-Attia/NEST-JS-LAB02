import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, PaymentMethod } from './order';
import { Product } from '../products/product';
import { User } from '../users/user';
import { CreateOrderDto } from './dto/orders/dto/create-order.dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createOrder(data: {
    amount: number;
    longitude: number;
    latitude: number;
    clientId: number;
    paymentMethod: 'Cash' | 'Visa';
    productIds: number[];
  }) {
    // جلب العميل
    const user = await this.userRepo.findOne({
      where: { id: data.clientId }, // تأكدي إن id فعلاً number
    });
    if (!user) throw new NotFoundException('User not found');

    // جلب المنتجات
    const products = await this.productRepo.findByIds(data.productIds);

    // إنشاء الطلب
    const order = this.orderRepo.create({
      amount: data.amount,
      longitude: data.longitude,
      latitude: data.latitude,
      client: user,
      products: products,
      paymentMethod:
        data.paymentMethod === 'Cash'
          ? PaymentMethod.CASH
          : PaymentMethod.VISA,
    });

    return this.orderRepo.save(order);
  }

  async getAll() {
  return this.orderRepo.find({
    relations: ['client', 'products'],
  });
}

  async getOrderDetails(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id: id.toString() },
      relations: ['client', 'products'],
    });

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }


  async createOrderWithUser(
  userId: number,
  data: CreateOrderDto,
) {
  const user = await this.userRepo.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException('User not found');

  const products = await this.productRepo.findByIds(data.productIds);

  const order = this.orderRepo.create({
    amount: data.amount,
    longitude: data.longitude,
    latitude: data.latitude,
    client: user,
    products,
    paymentMethod:
      data.paymentMethod === 'Cash'
        ? PaymentMethod.CASH
        : PaymentMethod.VISA,
  });

  return this.orderRepo.save(order);
}

}
