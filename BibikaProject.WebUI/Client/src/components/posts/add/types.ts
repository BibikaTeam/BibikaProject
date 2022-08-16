export enum CurrentStep {
  FirstStep = 1,
  SecondStep,
  ThirdStep,
  LastStep,
}

export interface ImageSrcIdModel {
  imageSrc: string;
  imageId: number;
}

export interface AddOptionsToPostModel {
  id: number;
  optionsId: Array<number>;
}

export interface AddPostModel {
  description: string;
  year: string;
  location: string;
  mileage: number;
  color: string;
  sellerId: string;
  carId: number;
  price: number;
}

export interface AddImagesToPostModel {
  postId: number;
  imagesId: Array<number>;
}

export interface AddOptionsToPostModel {
  id: number;
  optionsId: Array<number>;
}

export interface IRadioGroupDataType {
  id: number;
  title: string;
}

export interface IGearBoxModel {
  id: number;
  title: string;
}

export interface IGetCarDTO {
  generationId: number;
  engineId: number;
  gearBoxId: number;
  carBodyId: number;
  completeSetId: number;
}
