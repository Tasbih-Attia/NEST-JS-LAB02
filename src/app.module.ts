import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',      
      password: 'tasbih',      
      database: 'techxpress',    
      autoLoadEntities: true,
      synchronize: true,
    }),
    OrdersModule,
  ],
  
})
export class AppModule {}
