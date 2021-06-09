import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarService } from 'src/car/car.service';
import { CarEntity } from 'src/car/entities/car.entity';
import { Between, MoreThan } from 'typeorm';
import { createOrderDto } from './dto/create.dto';
import { OrderEntity } from './entities/order.entity';
import { Tariff } from './enum/tariff.enum';
import { OrderRepo } from './repo/order.repo';

@Injectable()
export class OrderService {
    constructor(
        private repo: OrderRepo,
        private carService: CarService
    ) {}

    async findAll(options?): Promise<OrderEntity[]> {
        return await this.repo.find({
            where: options
        })
    }

    async findOne(options?): Promise<OrderEntity | null> {
        return await this.repo.findOne({
            where: options
        })
    }

    async create(data: createOrderDto) {
        if (data.daysQty > 30) {
            throw new HttpException('Максимальный срок аренды - 30 дней.', HttpStatus.BAD_REQUEST)
        }
        data.dateEnd = new Date(data.dateStart)
        data.dateEnd.setDate(data.dateStart.getDate() + data.daysQty)
        if ([6, 0].includes(data.dateStart.getDay()) || [6, 0].includes(data.dateEnd.getDay())) {
            throw new HttpException('Начало и конец аренды не может выпадать на выходной день (суббота, воскресенье).', HttpStatus.BAD_REQUEST)
        }

        const car: CarEntity = await this.carService.findOne({
            id: data.car.id,
            lastOrderDate: MoreThan(data.dateStart)
        })
        if (!car) {
            throw new HttpException('В это время свободных машин нет', HttpStatus.NOT_FOUND)
        }
        const lastOrder = new Date(car.lastOrderDate)
        lastOrder.setDate(+lastOrder.getDate() + 3)
        if (lastOrder > data.dateStart) {
            throw new HttpException('Пауза между бронированиями должна составлять 3 дня', HttpStatus.NOT_FOUND)
        }
    
        const tariff = await this.chooseTariff(data.tariff)
        Object.assign(data, tariff)
    
        const totalPrice = +data.daysQty * +data.price
        data.totalPrice = await this.findNewPrice(totalPrice, data.daysQty)
        data.km *= +data.daysQty
        return await this.repo.save(data)
    }

    async chooseTariff(tariff: Tariff) {
        switch (tariff) {
            case Tariff.FIRST:
                return { price: 270, km: 200 }
            case Tariff.SECOND:
                return { price: 330, km: 350 }
            case Tariff.THIRD:
                return { price: 390, km: 500 }
        }
    }

    async findNewPrice(price: number, days: number) {
        switch (true) {
            case days > 2 && days < 6:
                return await this.findDiscount(price, 5)
            case days > 5 && days < 15:
                return await this.findDiscount(price, 10)        
            case days > 14 && days < 31:
                return await this.findDiscount(price, 15)
            default:
                return price
        }
    }

    async findDiscount(price: number, discount: number) {
        return (price / 100) * (100 - discount)
    }

    async delete(id: number) {
        const order = await this.findOne({ id })
        if (!order) {
            throw new HttpException('Бронь с таким id не найдена', HttpStatus.NOT_FOUND)
        }
        await this.repo.delete(order)
        return { messsage: 'Бронь была успешно удалена' }
    }

    async carStat(carID: number, carName: string, dateStart: Date) {
        const dateEnd: Date = new Date(dateStart)
        dateEnd.setMonth(dateStart.getMonth() - 1)
        const orders: any = await this.findAll({
            car: carID,
            dateStart: Between(dateStart, dateEnd)
        })
        let avgLoad, totalKM = 0
        if (orders.length > 0) {
            orders.map(order => totalKM += order.km)
            avgLoad = totalKM / 30    
        }
        return { carName, avgLoad }
    }

    async allCarsStat(date) {
        const cars: CarEntity[] = await this.carService.findAll()
        if (cars.length < 1) {
            return { message: 'Сейчас никаких машин нет' }
        }
        const stat = []
        for (let car of cars) {
            const carName = `${car.brand} ${car.model} (${car.VIN})`
            stat.push(await this.carStat(car.id, carName, date))
        }
        return stat
    }
}
