import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { DB_ENTITIES } from "./db_entities"
require('dotenv').config()

export const DB_CONFIG: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: DB_ENTITIES,
    autoLoadEntities: true,
    synchronize: true,
}
