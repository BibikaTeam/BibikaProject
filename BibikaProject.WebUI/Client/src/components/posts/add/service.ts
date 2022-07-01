import { AddImagesToPostModel, AddOptionsToPostModel, AddPostModel } from "../types";
import http from "../../../http_common";
import axios from "axios";
import { IEngineModel, IFluentValidationError, IGenerationModel, IModelModel } from "../../adminPanel/types";
import { date } from "yup";

export const loadImage = async (base64: string) => {
    
    const response = await http
        .post(
            "api/image/add", 
            base64, 
            {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }})
        .then((response) => { return response.data})
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

export const deleteImage = async (imageId: number) => {
    const response = await http
        .delete(`api/image/delete/${imageId}`)
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

export const getImage = async (imageId: number) => {
    const response = await http
        .get(`api/image/get/${imageId}`)
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
    return response;
}

export const getGenerationByModelId = async (modelId: number) => {
    const response = await http 
        .get<Array<IGenerationModel>>(`api/generation/get/by-model/${modelId}`)
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