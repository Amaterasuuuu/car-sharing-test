import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRepo } from './repo/car.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarRepo])
  ],
  providers: [CarService],
  controllers: [CarController]
})
export class CarModule {}
