<<<<<<< HEAD
export interface IBannerCar {
  mainImageSrc: string;
  title: string;
  price: number;
  location: string;
  year: number;
  mileage: number;
  engine: string;
  gearBoxTitle: string;
  description: string;
  id: number;
=======
import { ICarModel } from "../adminPanel/types";

export interface IBannerCar {
  // title: string;
  // price: number;
  // location: string;
  // year: number;
  // mileage: number;
  // engine: string;
  // gearBoxTitle: string;
  // description: string;
  // id: number;

  color: string;
  id: number;
  likes: number;
  location: string;
  mileage: number;
  price: number;
  sellerName: string;
  viewes: number;
  year: number;
  car: ICarModel;
  description: string;
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
}
export interface IShortSearchRespond {
  brand: number | undefined;
  model: number | undefined;
  quality: null | string | undefined;
  generation: number | null | undefined;
  priceFrom: number | null | undefined;
  priceTo: number | null | undefined;
  yearFrom: number | null | undefined;
  yearTo: number | null | undefined;
}
export interface IShortCarsCarsRequest {
  page: number;
  countOnPage: number;
  search: string; //by descr
  searchId: number;
}
