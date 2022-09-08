import axios from "axios";
import qs from "qs";
import { ErrorStrings } from "../../../constants";
import http from "../../../http_common";
import { IRequestError } from "../types";

export const getAllPosts = async () => {
  try {
    const response = await http.get(`api/post/get/all`);
    console.log("service user posts", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.request.status == 0 || error.request.status == 500) {
        const unknownError: IRequestError = {
          code: error.request.status,
          errors: new Array<string>(ErrorStrings.backendNotResponse()),
        };
        throw unknownError;
      }
      let serverError: IRequestError = {
        errors: error.response?.data.Errors,
        code: error.response?.data.Code,
      };
      throw serverError;
    }
  }
};


export const getUserPostEmail = async (userId: string) => {
  try {
    const response = await http.get(`api/post/get/user-posts/${userId}`);
    console.log("service user posts", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.request.status == 0 || error.request.status == 500) {
        const unknownError: IRequestError = {
          code: error.request.status,
          errors: new Array<string>(ErrorStrings.backendNotResponse()),
        };
        throw unknownError;
      }
      let serverError: IRequestError = {
        errors: error.response?.data.Errors,
        code: error.response?.data.Code,
      };
      throw serverError;
    }
  }
};

export const deletePostUser = async (postId: number) => {
  try {
    const response = await http.delete(`api/post/delete/${postId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.request.status == 0 || error.request.status == 500) {
        const unknownError: IRequestError = {
          code: error.request.status,
          errors: new Array<string>(ErrorStrings.backendNotResponse()),
        };
        throw unknownError;
      }
      let serverError: IRequestError = {
        errors: error.response?.data.Errors,
        code: error.response?.data.Code,
      };
      throw serverError;
    }
  }
};