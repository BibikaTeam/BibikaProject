export enum CurrentStep {
    FirstStep = 1,
    SecondStep,
    ThirdStep
}

export interface AddImagesToPostModel {
    id: number,
    imagesId: Array<number>
}

export interface ImageSrcIdModel {
    imageSrc: string,
    imageId: number,
}

export interface AddOptionsToPostModel {
    id: number,
    optionsId: Array<number>
}

export interface AddPostModel {
    description: string,
    year: Date,
    location: string,
    mileage: number,
    color: string,
    sellerId: string,
    carId: number,
}

export interface AddImagesToPostModel {
    id: number,
    imagesId: Array<number>
}

export interface AddOptionsToPostModel {
    id: number,
    optionsId: Array<number>
}

export interface IRadioGroupDataType {
    id: number;
    title: string;
}