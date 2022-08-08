import { ICarModel } from "../../adminPanel/types";

export interface IPostModel {
    year: Date,
    location: string,
    color: string,
    mileage: number,
    sellerName: string,
    likes: number,
    viewes: number,
    car: ICarModel,
    price: number
}