import {
  ICarBodyModel,
  ICarModel,
  IPaginationCarModel,
  IPaginationRequest,
  IRequestError,
} from "../types";
import { ErrorStrings } from "../../../constants";
import http from "../../../http_common";
import axios from "axios";
import qs from "qs";

export const getCarsByPaginationModel = async (data: IPaginationCarModel) => {
  try {
    const response = await http.get<IPaginationRequest<ICarModel>>(
      "/api/car/get?" + qs.stringify(data, { skipNulls: true })
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

export const deleteCar = async (data: number) => {
  try {
    const response = await http.delete(`api/car/delete/${data}`);
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
export const getAllCarBodies = async () => {
  try {
    const response = await http.get<Array<ICarBodyModel>>(
      `api/carBody/get/all`
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
