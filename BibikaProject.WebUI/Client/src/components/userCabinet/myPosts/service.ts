import http from "../../../http_common";
import axios from "axios";
import qs from "qs";
import { ErrorStrings } from "../../../constants";
import { IProfileCarPreview } from "../types";
import { IRequestError } from "../../adminPanel/types";

export const getUserCars = async () => {
  try {
    const response = await http.get<Array<IProfileCarPreview>>(
      `api/post/get/user-posts`
    );

    response.data.map((x: IProfileCarPreview) => {
      //@ts-ignore
      x.title = x.car.title;
      x.messages = 27;
    });

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
