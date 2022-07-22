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
  generationId: number;
}
