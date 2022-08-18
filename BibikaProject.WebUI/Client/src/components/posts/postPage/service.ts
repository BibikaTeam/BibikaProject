import { IPostModel } from "./types";
import http from "../../../http_common";
import axios from "axios";
import { IRequestError } from "../../adminPanel/types";
import { ErrorStrings } from "../../../constants";

export const getPostById = async (id: number) => {
    try {
        const response = await http.get<IPostModel>(`api/post/get/${id}`);
        
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

export const getImagesByPostId = async (postId: number) => {
  try {
    const response = await http.get<string[]>(`api/image/get/by-post/${postId}`);
    
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
}