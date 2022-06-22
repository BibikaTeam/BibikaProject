import { AddImagesToPostModel, AddPostModel } from "../types";
import http from "../../../http_common";
import axios from "axios";
import { IFluentValidationError } from "../../adminPanel/types";

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