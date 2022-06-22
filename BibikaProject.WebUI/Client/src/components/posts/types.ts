export interface AddImagesToPostModel {
    id: number,
    imagesId: Array<number>
}

export interface AddOptionsToPostModel {
    id: number,
    optionsId: Array<number>
}

export interface AddPostModel {
    description: string,
    year: Date,
    location: string,
    color: string,
    sellerId: string,
    carId: number,

}