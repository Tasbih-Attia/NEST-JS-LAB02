import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user';
import { Product } from './products/product';
import { Order } from './orders/order';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: 'tasbih', 
      database: 'techxpress',
      entities: [User, Product, Order],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Product, Order]),
    AuthModule,
  ],
  
})
export class AppModule {}
