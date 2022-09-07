import axios from "axios";
import qs from "qs";
import { ErrorStrings } from "../../../constants";
import http from "../../../http_common";
import { IRequestError } from "../types";

export const getUserPostEmail = async (userEmail: string) => {
  try {
    const response = await http.get(`api/post/get/user-posts/?` + qs.stringify(userEmail));
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

export const deletePostUser = (postId: number) => {
  try {
    
  } catch (error) {
    
  }
};