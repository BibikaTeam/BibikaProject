import http from "../../../http_common"
import axios from "axios";
import { IUpdateContactModel, INewPasswordModel, IUpdateEmailModel, IConfirmOldPasswordModel, IResetPasswordRequestModel } from "../types";
import { IRequestError } from "../../adminPanel/types";
import { ErrorStrings } from "../../../constants";

export const saveContact = (values: IUpdateContactModel) => {
    console.log("contact", values);
}

export const confirmOldPassword = (values: IConfirmOldPasswordModel) => {
    console.log("old password", values);
}

export const savePassword = (values: INewPasswordModel) => {
    console.log("password", values);
}

export const saveEmail = (values: IUpdateEmailModel) => {
    console.log("email", values);
}

export const resetPassword = async (data: IResetPasswordRequestModel) => {
    try {
        const response = await http.post("api/reset-password",data);
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