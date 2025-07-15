import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PaymentMethod } from 'src/orders/order';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  clientId?: number;

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;
}

