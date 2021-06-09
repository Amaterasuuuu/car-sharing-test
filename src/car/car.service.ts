import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createCarDto } from './dto/create.dto';
import { editCarDto } from './dto/edit.dto';
import { CarEntity } from './entities/car.entity';
import { CarRepo } from './repo/car.repo';

@Injectable()
export class CarService {
    constructor(private repo: CarRepo) {}

    async findAll(options?): Promise<CarEntity[]> {
        return await this.repo.find({
            where: options
        })
    }

    async findOne(options?): Promise<CarEntity | null> {
        return await this.repo.findOne({
            where: options
        })
    }

    async create(data: createCarDto): Promise<CarEntity> {
        const exist: CarEntity = await this.findOne({
            VIN: data.VIN
        })
        if (exist) {
            throw new HttpException('Машина с таким VIN уже существует', HttpStatus.CONFLICT)
        }
        return await this.repo.save(data)
    }

    async edit(data: editCarDto): Promise<CarEntity> {
        const car = await this.findOne({
            id: data.id
        })
        if (!car) {
            throw new HttpException('Машина с таким id не найдена', HttpStatus.NOT_FOUND)
        }
        Object.assign(car, data)
        return await this.repo.save(car)
    }

    async delete(id: number) {
        const car = await this.findOne({ id })
        if (!car) {
            throw new HttpException('Машина с таким id не найдена', HttpStatus.NOT_FOUND)
        }
        await this.repo.delete(car)
        return { messsage: 'Машина была успешно удалена' }
    }
}
