import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() body: Partial<Product>): Promise<Product> {
    return this.productsService.create(body);
  }
}
