import { ApiProperty } from "@nestjs/swagger"

export class createCarDto {
    @ApiProperty()
    brand: string

    @ApiProperty()
    model: string

    @ApiProperty()
    number: string

    @ApiProperty()
    VIN: string
}
