import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Order } from '../orders/order';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @ManyToMany(() => Order, order => order.products)
  orders: Order[];
}

