import { Tariff } from "../enum/tariff.enum";

export interface IOrder {
    id?: number
    tariff: Tariff
    daysQty: number
    dateStart: Date
    dateEnd: Date
    km?: number
    price?: number
    totalPrice?: number
}
