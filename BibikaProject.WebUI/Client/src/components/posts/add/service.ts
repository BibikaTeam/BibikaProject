import { AddImagesToPostModel, AddOptionsToPostModel, AddPostModel } from "../types";
import http from "../../../http_common";
import axios from "axios";
import { IEngineModel, IFluentValidationError, IGenerationModel, IModelModel } from "../../adminPanel/types";

export const loadImage = async (base64: string) => {
    const response = await http
        .post("api/image/add", base64)
        .catch(function (error) {
            if (axios.isAxiosError(error)) {
                const serverError: IFluentValidationError = Object.assign(
                    {},
                    error.response?.data
                );
                serverError.errors = [];
                Object.keys(error.response?.data.errors).forEach((el1) => {
                    error.response?.data.errors[el1].forEach((el2: string) => {
                        serverError.errors.push(el2);
                    });
                });
            }
        });
    return response;
}

export const addPost = async (data: AddPostModel) => {
    const response = await http
        .post("api/post/add", data)
        .catch(function (error) {
            if (axios.isAxiosError(error)) {
                const serverError: IFluentValidationError = Object.assign(
                    {},
                    error.response?.data
                );
                serverError.errors = [];
                Object.keys(error.response?.data.errors).forEach((el1) => {
                    error.response?.data.errors[el1].forEach((el2: string) => {
                        serverError.errors.push(el2);
                    });
                });
            }
        });
}

export const addImagesToPost = async (data: AddImagesToPostModel) => {
    const response = await http
        .post("api/post/add-images", data)
        .catch(function (error) {
            if (axios.isAxiosError(error)) {
                const serverError: IFluentValidationError = Object.assign(
                    {},
                    error.response?.data
                );
                serverError.errors = [];
                Object.keys(error.response?.data.errors).forEach((el1) => {
                    error.response?.data.errors[el1].forEach((el2: string) => {
                        serverError.errors.push(el2);
                    });
                });
            }
        });
}

export const addOptionsToPost = async (data: AddOptionsToPostModel) => {
    const response = await http
        .post("api/post/add-options", data)
        .catch(function (error) {
            if (axios.isAxiosError(error)) {
                const serverError: IFluentValidationError = Object.assign(
                    {},
                    error.response?.data
                );
                serverError.errors = [];
                Object.keys(error.response?.data.errors).forEach((el1) => {
                    error.response?.data.errors[el1].forEach((el2: string) => {
                        serverError.errors.push(el2);
                    });
                });
            }
        });
}

export const getModelsByBrandId = async (brandId: number ) => {
    const response = await http
        .get<Array<IModelModel>>(`api/model/get/by-brand/${brandId}`)
        .then((response) => { return response.data })
        .catch(function (error) {
            if (axios.isAxiosError(error)) {
                const serverError: IFluentValidationError = Object.assign(
                    {},
                    error.response?.data
                );
                serverError.errors = [];
                Object.keys(error.response?.data.errors).forEach((el1) => {
                    error.response?.data.errors[el1].forEach((el2: string) => {
                        serverError.errors.push(el2);
                    });
                });
            }
        });
        console.log("response getModelsByBrandId", response);
        
    return response;
}

export const getGenerationByModelId = async (modelId: number) => {
    const response = await http 
        .get<Array<IGenerationModel>>(`api/generation/get/by_model/${modelId}`)
        .then((response) => { return response.data })
        .catch(function (error) {
            if (axios.isAxiosError(error)) {
                const serverError: IFluentValidationError = Object.assign(
                    {},
                    error.response?.data
                );
                serverError.errors = [];
                Object.keys(error.response?.data.errors).forEach((el1) => {
                    error.response?.data.errors[el1].forEach((el2: string) => {
                        serverError.errors.push(el2);
                    });
                });
            }
        });
    return response;
}

export const getEngineByGenerationId = async (generationId: number) => {
    const response = await http
        .get<Array<IEngineModel>>(`api/engine/get/by-generation/${generationId}`)
        .then((response) => { return response.data})
        .catch(function (error) {
            if(axios.isAxiosError(error)) {
                const serverError: IFluentValidationError = Object.assign(
                    {},
                    error.response?.data
                );
                serverError.errors=[];
                Object.keys(error.response?.data.errors).forEach((el1) => {
                    error.response?.data.errors[el1].forEach((el2: string) => {
                        serverError.errors.push(el2);
                    });
                });
            }
        });
    return response;
}