import { ApiProperty } from "@nestjs/swagger";
import { OrderEntity } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ICar } from "../interfaces/car";

@Entity({
    name: 'car'
})
export class CarEntity implements ICar {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({
        type: 'text',
        nullable: false
    })
    brand: string

    @ApiProperty()
    @Column({
        type: 'text',
        nullable: false
    })
    model: string

    @ApiProperty()
    @Column({
        type: 'text',
        nullable: false
    })
    number: string

    @ApiProperty()
    @Column({
        type: 'text',
        nullable: false
    })
    VIN: string

    @ApiProperty()
    @Column({
        type: 'date',
        default: new Date()
    })
    lastOrderDate: Date

    @OneToMany(() => OrderEntity, order => order.car)
    orders: OrderEntity[]
}
