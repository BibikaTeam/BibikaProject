import {
  IBrandModel,
  IGenerationAddModel,
  IGenerationModel,
  IModelModel,
  IPaginationModel,
  IPaginationRequest,
  IRequestError,
} from "../types";
import http from "../../../http_common";
import axios from "axios";
import qs from "qs";
import { ErrorStrings } from "../../../constants";

export const getPaginatedGenerations = async (
  paginationModel: IPaginationModel
) => {
  try {
    const response = await http.get<IPaginationRequest<IGenerationModel>>(
      `api/generation/get?` + qs.stringify(paginationModel)
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

export const deleteGeneration = async (data: number) => {
  try {
    const response = await http.delete(`api/generation/delete/${data}`);
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

export const addGeneration = async (data: IGenerationAddModel) => {
  try {
    const response = await http.post("api/generation/add", data);
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
