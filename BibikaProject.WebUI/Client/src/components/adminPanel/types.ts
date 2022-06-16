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

export interface IModelModel {
  id: number;
  title: string;
  brandTitle: string;
}

export interface IAddModelModel {
  title: string;
  brandId: number;
}

export interface IUpdateModelModel {
  id: number;
  title: string;
}

export interface IGenerationModel {
  title: string;
  brandTitle: string;
  modelTitle: string;
}

export interface IPaginationBrandModel {
  page: number;
  countOnPage: number;
  search: string;
}

export interface IPaginationModelModel {
  page: number;
  countOnPage: number;
  search: string;
  brandId: number;
}
export interface IPaginationModel {
  page: number;
  countOnPage: number;
  search: string;
}

export interface IPaginationBrandRequest {
  data: Array<IBrandModel>;
  currentPage: number;
  allPages: number;
}

export interface IPaginationModelRequest {
  data: Array<IModelModel>;
  currentPage: number;
  allPages: number;
}

export interface IBrandResponse {
  data: null | Array<IBrandModel> | boolean | undefined;

  //isAuth: boolean;
}

//Errors

export interface IPaginationRequest<type> {
  data: Array<type>;
  currentPage: number;
  allPages: number;
}

export interface IGenerationModel {
  id: number;
  title: string;
  brandTitle: string;
  modelTitle: string;
}

export interface IGenerationAddModel {
  id: number;
  title: string;
  modelId: number;
}

export interface IPaginationGenerationModel {
  page: number;
  countOnPage: number;
  search: string;
  brandId: number;
  modelId: number;
}

export type IRequestError = {
  code: number;
  errors: Array<string>;
};
