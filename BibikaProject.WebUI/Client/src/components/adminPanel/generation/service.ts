import { BrandErrorType, GenerationErrorType, IBrandModel, IGenerationAddModel, IGenerationModel, IModelModel, IPaginationModel, IPaginationRequest, ModelErrorType } from "../types";
import http from "../../../http_common";
import axios from "axios";
import qs from "qs";

export const getModelsByBrand = async (id: number) => {
  const response = await http
    .get<Array<IModelModel>>(`api/model/get/by-brand/${id}`)
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

export const getPaginatedGenerations = async (paginationModel: IPaginationModel) => {
    const response = await http
      .get<IPaginationRequest<IGenerationModel>>(`api/generation/get?` + qs.stringify(paginationModel))
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        if (axios.isAxiosError(error)) {
          const serverError: GenerationErrorType = {
            errorsString: error.response?.data as Array<string>,
          };
          if (serverError) {
            throw serverError;
          }
        }
      });
  
    return response;
};

export const deleteGeneration = async (data: number) => {
    const response = await http
      .delete(`api/generation/delete/${data}`)
      .catch(function (error) {
        if (axios.isAxiosError(error)) {
          const serverError: GenerationErrorType = {
            errorsString: error.response?.data as Array<string>,
        };
        if (serverError) {
            throw serverError;
        }
    }
    });
};

  export const addGeneration = async (data: IGenerationAddModel) => {
    const response = await http
      .post("api/generation/add", data)
      .catch(function (error) {
        if (axios.isAxiosError(error)) {
          const serverError: GenerationErrorType = {
            errorsString: error.response?.data as Array<string>,
          };
          if (serverError) {
            throw serverError;
          }
        }
      });
  };