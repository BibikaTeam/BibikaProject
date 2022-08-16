import {
  IBrandModel,
  IPaginationBrandModel,
  IPaginationBrandRequest,
  IPaginationRequest,
  IRequestError,
} from "../types";
import http from "../../../http_common";
import axios, { AxiosError } from "axios";
import qs from "qs";
import { ErrorStrings } from "../../../constants";

export const getAllBrands = async () => {
  try {
    const response = await http.get(`api/brand/get/all`);

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

export const getPaginatedBrands = async (
  paginationModel: IPaginationBrandModel
) => {
  try {
    const response = await http.get<IPaginationRequest<IBrandModel>>(
      `api/brand/get?` + qs.stringify(paginationModel)
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

export const addBrand = async (data: IBrandModel) => {
  try {
    const response = await http.post("api/brand/add", data);
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

export const deleteBrand = async (data: number) => {
  try {
<<<<<<< HEAD
    const response = await http.delete(`api/brand/delete/${465465}`);
=======
    const response = await http.delete(`api/brand/delete/${data}`);
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
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
