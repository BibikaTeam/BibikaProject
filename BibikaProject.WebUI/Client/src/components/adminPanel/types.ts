export interface ICarModel {
  id: number;
  engine: IEngineModel;
  carBodyTitle: string;
  completeSetTitle: string;
  gearBoxTitle: string;
  title: string;
}

export interface IBrandModel {
  id: number;
  title: string;
}

export interface IEngineModel {
  id: number;
  title: string;
  capacity: string;
  kwPower: number;
  fuel: string;
}
export interface ICompleteSetModel {
  id: number;
  title: string;
}
export interface ICompleteSetAddDTO {
  title: string;
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

export interface IPaginationCarModel {
  page: number;
  search: string;
  countOnPage: number;
  generationId: number | null;
  engineId: number | null;
  carBodyId: number | null;
  gearboxId: number | null;
  completeSetId: number | null;
}

export interface ICarBodyModel {
  id: number;
  title: string;
}

export interface IGearboxModel {
  id: number;
  title: string;
}

export interface IPostModel {
  id: number;
  year: string;
  location: string;
  color: string;
  mileage: number;
  sellerName: string;
  likes: number;
  viewes: string;
  car: ICarModel;
  price: number;
  description: string;
}

export interface IDataAdvertisingPost {
  postId: number,
  points: number,
  showBanner: number,
  showTernd: number
}
