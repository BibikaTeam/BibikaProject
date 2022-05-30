import { IModelModel, ModelErrorType, IPaginationModel, IPaginationModelRequest, IAddModelModel } from "../types"
import http from "../../../http_common"
import axios from "axios";
import qs from "qs";

export const getAllModel = async () => {
  const response = await http
    .get("api/model/get/all")
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        const serverError: ModelErrorType = {
          errorsString: error.response?.data as Array<string>,
        };
        if (serverError) {
          throw serverError;
        }
      }
    });
  return response;
}

export const getPaginatedModels = async (paginationModel: IPaginationModel) => {
  const response = await http
    .get<IPaginationModelRequest>(`api/model/get?` + qs.stringify(paginationModel))
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        const serverError: ModelErrorType = {
          errorsString: error.response?.data as Array<string>,
        };
        if (serverError) {
          throw serverError;
        }
      }
    });

  return response;
};

export const addModel = async (data: IAddModelModel) => {
  console.log("data service add", data);
  const response = await http
    .post("api/model/add", data)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        const serverError: ModelErrorType = {
          errorsString: error.response?.data as Array<string>,
        };
        if (serverError) {
          throw serverError;
        }
      }
    });
};

export const updateModel = async (data: IModelModel) => {
  const response = await http
    .put("api/model/update", data)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        const serverError: ModelErrorType = {
          errorsString: error.response?.data as Array<string>,
        };
        if (serverError) {
          throw serverError;
        }
      }
    });
}

export const deleteModal = async (data: number) => {
  const response = await http
    .delete(`api/model/delete/${data}`)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        const serverError: ModelErrorType = {
          errorsString: error.response?.data as Array<string>,
        };
        if (serverError) {
          throw serverError;
        }
      }
    });
}