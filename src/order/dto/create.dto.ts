import { ApiProperty } from "@nestjs/swagger"
import { CarEntity } from "src/car/entities/car.entity"
import { Tariff } from "../enum/tariff.enum"

export class createOrderDto {
    @ApiProperty()
    tariff: Tariff

    @ApiProperty()
    daysQty: number
    
    @ApiProperty()
    dateStart: Date
    
    @ApiProperty()
    dateEnd?: Date
    
    @ApiProperty()
    price?: number
    
    @ApiProperty()
    km?: number
    
    @ApiProperty()
    totalPrice?: number
    
    @ApiProperty()
    car: CarEntity
}
