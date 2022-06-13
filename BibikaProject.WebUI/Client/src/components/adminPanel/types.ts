import { List } from "reselect/es/types";

export interface ICarModel {
  engineTitle: string;
  carBodyTitle: string;
  completeSetTitle: string;
}

export interface IBrandModel {
  id: number;
  title: string;
}
export interface IEngineModel {
  id: number;
  title: string;
  capacity: string;
  kWPower: number;
  fuel: string;
}

export interface BrandErrorType {
  errorsString: Array<string>;
}

export interface IModelModel {
  title: string;
  brandTitle: string;
}

export interface IGenerationModel {
  title: string;
  brandTitle: string;
  modelTitle: string;
}

export interface IBrandState {
  brand: null | List<IBrandModel>;
  //isAuth: boolean;
}

export interface IModelState {
  brand: null | IBrandModel;
  model: null | IModelModel;
  //isAuth: boolean;
}

export interface ICarState {
  brand: null | IBrandModel;
  model: null | IModelModel;
  //isAuth: boolean;
}

export interface IGenerationState {
  brand: null | IBrandModel;
  model: null | IModelModel;
  generation: null | IGenerationModel;
}

export interface IPaginationModel {
  page: number;
  countOnPage: number;
  search: string;
}
export interface IPaginationRequest<type> {
  data: Array<type>;
  currentPage: number;
  allPages: number;
}