import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from 'src/car/car.service';
import { CarRepo } from 'src/car/repo/car.repo';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepo } from './repo/order.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepo, CarRepo]),
  ],
  controllers: [OrderController],
  providers: [OrderService, CarService]
})
export class OrderModule {}
