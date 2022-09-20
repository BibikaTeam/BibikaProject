import http from "../../../http_common";
import axios from "axios";
import { IRequestError } from "../../adminPanel/types";
import { ErrorStrings } from "../../../constants";
import { IUser } from "../../authorization/types";
import jwt_decode from "jwt-decode";
import { IMessage } from "./types";

export const getAllChats = async () => {
  try {
    const response = await http.get(`api/user/get-chats`);

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

export const getUserName = async (email: string) => {
  try {
    const response = await http.get<string>(`api/get-name-by-mail/${email}`);

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
export const getLastMessage = async (email: string) => {
  try {
    const response = await http.get<IMessage>(
      `api/user/get-last-message/${email}`
    );

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
export const sendMessage = async (toEmail: string, body: string) => {
  try {
    const token = localStorage.getItem("token");

    if (token && toEmail) {
      const user = jwt_decode(token as string) as IUser;
      const responseBody = {
        text: body,
        fromEmail: user.email,
        toEmail,
      };
      await http.post(`api/user/send-message`, responseBody);
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
export const getMessages = async (email: string) => {
  try {
    const response = await http.get<Array<IMessage>>(
      `api/user/get-message?email=${email}`
    );

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
