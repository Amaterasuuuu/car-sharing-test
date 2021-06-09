import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { createOrderDto } from './dto/create.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private service: OrderService) {}

    @Get()
    @ApiOkResponse({ type: [OrderEntity] })
    async findAll() {
        return await this.service.findAll()
    }

    @Get(':id')
    @ApiOkResponse({ type: OrderEntity })
    @ApiNotFoundResponse({ description: 'Бронь с таким id не найдена' })
    async findOne(@Param('id') id: number) {
        return await this.service.findOne({ id })
    }

    @Post()
    @ApiCreatedResponse({ type: OrderEntity })
    @ApiBadRequestResponse({ description: 'Максимальный срок аренды - 30 дней.\n\nНачало и конец аренды не может выпадать на выходной день (суббота, воскресенье).' })
    async create(@Body() data: createOrderDto) {
        return await this.service.create(data)
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Бронь была успешно удалена' })
    @ApiNotFoundResponse({ description: 'Бронь с таким id не найдена' })
    async delete(@Param('id') id: number) {
        return await this.service.delete(id)
    }

    @Get('all-cars-stat')
    async allCarsStat(@Query('date') date: Date) {
        return await this.service.allCarsStat(date)
    }
}
