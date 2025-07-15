import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository extends Repository<Order> {}

