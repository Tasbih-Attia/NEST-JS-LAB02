import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user';
import { Product } from '../products/product';

export enum PaymentMethod {
  CASH = 'Cash',
  VISA = 'Visa',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  amount: number;

  @Column('float')
  longitude: number;

  @Column('float')
  latitude: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => User, (user) => user.orders)
client: User;

@ManyToMany(() => Product, (product) => product.orders, { eager: false })
@JoinTable()
products: Product[];
}
