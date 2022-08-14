export interface IDetailSearchProps {
  filters: ICurrentCarDetailProps;
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

  priceFrom: number;
  priceTo: number;
}
