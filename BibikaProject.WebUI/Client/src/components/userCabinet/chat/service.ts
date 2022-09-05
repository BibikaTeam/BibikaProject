import http from "../../../http_common";
import axios from "axios";
import { IRequestError } from "../../adminPanel/types";
import { ErrorStrings } from "../../../constants";
import { IUser } from "../../authorization/types";
import jwt_decode from "jwt-decode";

export const getAllMessages = async () => {
  try {
    const response = await http.get(`api/user/get-chats`);

    console.log(response.data);
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

export const createChat = async (createWith: string) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token as string) as IUser;
      const respondBody = { fromEmail: user.email, toEmail: createWith };
      const response = await http.post(`api/user/create-chat`, respondBody);
    }
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
