import { ApiProperty } from "@nestjs/swagger";
import { CarEntity } from "src/car/entities/car.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tariff } from "../enum/tariff.enum";
import { IOrder } from "../interfaces/order";

@Entity({
    name: 'order'
})
export class OrderEntity implements IOrder {
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: Tariff
    })
    tariff: Tariff

    @ApiProperty()
    @Column({
        type: 'int',
        nullable: false
    })
    daysQty: number

    @ApiProperty()
    @Column({
        type: 'date',
        nullable: false
    })
    dateStart: Date

    @ApiProperty()
    @Column({
        type: 'date',
        nullable: false
    })
    dateEnd: Date

    @ApiProperty()
    @Column({
        type: 'int',
        nullable: false
    })
    km: number
    
    @ApiProperty()
    @Column({
        type: 'int',
        nullable: false
    })
    price: number
    
    @ApiProperty()
    @Column({
        type: 'int',
        nullable: false
    })
    totalPrice: number

    @ManyToOne(() => CarEntity, car => car.orders)
    car: CarEntity
}
