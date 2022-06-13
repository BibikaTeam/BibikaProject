export interface ICarModel {
  engineTitle: string;
  carBodyTitle: string;
  completeSetTitle: string;
}

export interface IBrandModel {
  id: number;
  title: string;
}

export interface BrandErrorType {
  errorsString: Array<string>;
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

export interface ModelErrorType {
  errorsString: Array<string>;
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
  brandId: number;
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
export interface IFluentValidationError {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: Array<string>;
}
