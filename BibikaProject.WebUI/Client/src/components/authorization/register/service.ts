import http from "../../../http_common";
import { IRegisterModel, RegisterErrorType } from "../types";
import axios from "axios";
import { IRequestError } from "../../adminPanel/types";
import { ErrorStrings } from "../../../constants";

export const registerUser = async (data: IRegisterModel) => {
  const response = await http
    .post("api/register", data)
    .catch(function (error) {
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
    });
};
