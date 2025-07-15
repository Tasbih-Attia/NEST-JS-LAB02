import { DataSource } from 'typeorm';
import { User } from './users/user';
import { Order } from './orders/order';
import { Product } from './products/product';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',         
  password: 'tasbih',    
  database: 'techxpress',       
  entities: [User, Order, Product],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
