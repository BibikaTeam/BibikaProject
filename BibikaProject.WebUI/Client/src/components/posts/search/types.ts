import { IPaginationRequest } from "../../adminPanel/types";
import { IBannerCar } from "../../home/types";

export enum SearchActionTypes {
  SET_CAR_RESULT = "SET_CAR_RESULT",
}
export interface SearchState {
  searchRespond: IPaginationRequest<IBannerCar>;
}

export interface IDetailSearchProps {
  filters: ICurrentCarDetailProps[];
  page: number;
  countOnPage: number;
  search: string;
}

export interface ICurrentCarDetailProps {
  yearMin: number;
  yearMax: number;
  location: string;
  color: string;
  brandId: number;
  modelId: number;
  generationId: number;
  engineId: number;
  carBodyId: number;
  completeSetId: number;
  gearBoxId: number;

  priceMin: number;
  priceMax: number;
}

export interface IMinMaxYearPriceDTO {
  minYear: number;
  maxYear: number;
  minPrice: number;
  maxPrice: number;
}

export interface WriteCarsAction {
  type: SearchActionTypes.SET_CAR_RESULT;
  payload: IPaginationRequest<IBannerCar>;
}

export type SearchAction = WriteCarsAction;
