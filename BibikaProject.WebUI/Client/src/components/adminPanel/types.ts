import { type } from "os";
import { List } from "reselect/es/types";

export enum AdminPanelActionTypes {
  ADMIN_PANEL_CAR = " ADMIN_PANEL_CAR",
  BRAND_ADD = "BRAND_ADD",
  ADMIN_PANEL_MODEL = "ADMIN_PANEL_MODEL",
  ADMIN_PANEL_GENERATION = "ADMIN_PANEL_GENERATION",
}

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

export interface ModelErrorType {
  errorsString: Array<string>;
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

export interface BrandAddAction {
  type: AdminPanelActionTypes.BRAND_ADD;
  payload: IBrandModel;
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

export type BrandAction = BrandAddAction;
