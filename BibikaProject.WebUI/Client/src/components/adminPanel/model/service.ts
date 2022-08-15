import {
  IPaginationModelModel,
  IPaginationModelRequest,
  IAddModelModel,
  IRequestError,
  IModelModel,
  IPaginationRequest,
} from "../types";
import http from "../../../http_common";
import axios from "axios";
import qs from "qs";
import { ErrorStrings } from "../../../constants";

export const getAllModels = async () => {
  try {
    const response = await http.get(`api/model/get/all`);

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

export const getPaginatedModels = async (
  paginationModel: IPaginationModelModel
) => {
  try {
    const response = await http.get<IPaginationRequest<IModelModel>>(
      `api/model/get?` + qs.stringify(paginationModel)
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

export const getModelsByBrand = async (id: number) => {
  try {
    const response = await http.get<Array<IModelModel>>(
      `api/model/get/by-brand/${id}`
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

export const addModel = async (data: IAddModelModel) => {
  try {
    const response = await http.post("api/model/add", data);
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

// export const updateBrand = async (data: IBrandModel) => {
//   const response = await http
//     .put("api/brand/update", data)
//     .catch(function (error) {
//       if (axios.isAxiosError(error)) {
//         const serverError: BrandErrorType = {
//           errorsString: error.response?.data as Array<string>,
//         };
//         if (serverError) {
//           throw serverError;
//         }
//       }
//     });
//   return response;
// };

export const deleteModel = async (data: number) => {
  try {
    const response = await http.delete(`api/model/delete/${465465}`);
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
