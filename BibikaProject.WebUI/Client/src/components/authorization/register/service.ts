import http from "../../../http_common";
import { IRegisterModel, RegisterErrorType } from "../types";
import axios from "axios";

export const registerUser = async (data: IRegisterModel) => {
  const response = await http
    .post("api/register", data)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        const serverError: RegisterErrorType = {
          errorsString: error.response?.data as Array<string>,
        };
        if (serverError) {
          throw serverError;
        }
      }
    });
};
