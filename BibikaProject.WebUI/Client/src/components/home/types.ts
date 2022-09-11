import {
  IBrandModel,
  ICarModel,
  ICompleteSetModel,
  IEngineModel,
  IGenerationModel,
  IModelModel,
} from "../adminPanel/types";
import { IGearBoxModel } from "../posts/add/types";

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
  sellerId: string;
  sellerEmail: string;
  viewes: number;
  year: number;
  car: ICarModel;
  description: string;
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
export interface SelectableValues {
  brands: Array<IBrandModel>;
  models: Array<IModelModel>;
  generations: Array<IGenerationModel>;
  completeSets: Array<ICompleteSetModel>;
  carBodies: Array<ICompleteSetModel>;
  fuelTypes: Array<String>;
  gearBoxes: Array<IGearBoxModel>;
  engines: Array<IEngineModel>;
  yearMin: number;
  yearMax: number;
  priceMin: number;
  priceMax: number;
}
