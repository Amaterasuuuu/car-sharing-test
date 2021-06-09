import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { createCarDto } from './dto/create.dto';
import { editCarDto } from './dto/edit.dto';
import { CarEntity } from './entities/car.entity';

@ApiTags('Car')
@Controller('car')
export class CarController {
    constructor(private service: CarService) {}

    @Get()
    @ApiOkResponse({ type: [CarEntity] })
    async findAll() {
        return await this.service.findAll()
    }

    @Get(':id')
    @ApiOkResponse({ type: CarEntity })
    @ApiNotFoundResponse({ description: 'Машина с таким id не найдена' })
    async findOne(@Param('id') id: number) {
        return await this.service.findOne({ id })
    }

    @Post()
    @ApiCreatedResponse({ type: CarEntity })
    @ApiConflictResponse({ description: 'Машина с таким VIN уже существует' })
    async create(@Body() data: createCarDto) {
        return await this.service.create(data)
    }

    @Put()
    @ApiOkResponse({ type: CarEntity })
    @ApiNotFoundResponse({ description: 'Машина с таким id не найдена' })
    async edit(@Body() data: editCarDto) {
        return await this.service.edit(data)
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Машина была успешно удалена' })
    @ApiNotFoundResponse({ description: 'Машина с таким id не найдена' })
    async delete(@Param('id') id: number) {
        return await this.service.delete(id)
    }
}
