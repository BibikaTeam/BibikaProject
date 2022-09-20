import http from "../../../http_common";
import axios from "axios";
import {
  IUpdateContactModel,
  INewPasswordModel,
  IUpdateEmailModel,
  IConfirmOldPasswordModel,
  IResetPasswordRequestModel,
} from "../types";
import { IRequestError } from "../../adminPanel/types";
import { ErrorStrings } from "../../../constants";
import { ILoginModel, LoginResponseType } from "../../authorization/types";

export const saveContact = (values: IUpdateContactModel) => {
  console.log("contact", values);
};

export const confirmOldPassword = async (values: ILoginModel) => {
  try {
    const response = await http.post<LoginResponseType>("/api/login", values);

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
    return Promise.reject();
  }
};

export const savePassword = async (values: INewPasswordModel) => {
  try {
    await http.post(`api/reset-password`, values);
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

export const saveEmail = (values: IUpdateEmailModel) => {
  console.log("email", values);
};

export const resetPassword = async (data: IResetPasswordRequestModel) => {
  try {
    const response = await http.post("api/reset-password", data);
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

export const sendPasswordRequest = async (email: string) => {
  try {
    const response = await http.post(`api/reset-password-request/${email}`);
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
