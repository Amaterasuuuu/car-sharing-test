import { EntityRepository, Repository } from "typeorm";
import { CarEntity } from "../entities/car.entity";

@EntityRepository(CarEntity)
export class CarRepo extends Repository<CarEntity> {}
