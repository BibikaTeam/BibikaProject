import { IEngineModel, IPaginationModel, IPaginationRequest } from "../types";
import http from "../../../http_common";
import axios from "axios";
import qs from "qs";

export const getAllEngines = async () => {
  const response = await http
    .get("api/engine/get/all")
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      // if (axios.isAxiosError(error)) {
      //   const serverError: BrandErrorType = {
      //     errorsString: error.response?.data as Array<string>,
      //   };
      //   if (serverError) {
      //     throw serverError;
      //   }
      // }
    });
  return response;
};

export const getPaginatedEngines = async (
  paginationModel: IPaginationModel
) => {
  const response = await http
    .get<IPaginationRequest<IEngineModel>>(
      `api/engine/get?` + qs.stringify(paginationModel)
    )
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      // if (axios.isAxiosError(error)) {
      //   const serverError: BrandErrorType = {
      //     errorsString: error.response?.data as Array<string>,
      //   };
      //   if (serverError) {
      //     throw serverError;
      //   }
      // }
    });

  return response;
};

export const addEngine = async (data: IEngineModel) => {
  const response = await http
    .post("api/engine/add", data)
    .catch(function (error) {
      // if (axios.isAxiosError(error)) {
      //   const serverError: BrandErrorType = {
      //     errorsString: error.response?.data as Array<string>,
      //   };
      //   if (serverError) {
      //     throw serverError;
      //   }
      // }
    });
};

export const deleteEngine = async (data: number) => {
  const response = await http
    .delete(`api/engine/delete/${data}`)
    .catch(function (error) {
      // if (axios.isAxiosError(error)) {
      //   const serverError: BrandErrorType = {
      //     errorsString: error.response?.data as Array<string>,
      //   };
      //   if (serverError) {
      //     throw serverError;
      //   }
      // }
    });
};
