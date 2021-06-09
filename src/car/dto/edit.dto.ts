import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class editCarDto {
    @ApiProperty()
    id: number

    @ApiPropertyOptional()
    brand: string

    @ApiPropertyOptional()
    model: string
    
    @ApiPropertyOptional()
    number: string
    
    @ApiPropertyOptional()
    VIN: string
}
