import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './car/car.module';
import { OrderModule } from './order/order.module';
import { DB_CONFIG } from './utils/db_config';

@Module({
  imports: [
    TypeOrmModule.forRoot(DB_CONFIG),
    CarModule,
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
