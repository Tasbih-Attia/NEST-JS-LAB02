import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { PaymentMethod } from 'src/orders/order';

export class CreateOrderDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  clientId: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;


  @IsNumber()
  productIds: number[];
}

