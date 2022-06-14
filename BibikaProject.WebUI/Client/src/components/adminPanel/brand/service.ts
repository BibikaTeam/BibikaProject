import {
  IBrandModel,
  BrandErrorType,
  IPaginationBrandModel,
  IPaginationBrandRequest,
  IFluentValidationError,
} from "../types";
import http from "../../../http_common";
import axios from "axios";
import qs from "qs";
import { ErrorStrings } from "../../../constants";

export const getAllBrands = async () => {
  const response = await http
    .get("api/brand/get/all")
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        const serverError: BrandErrorType = {
          errorsString: error.response?.data as Array<string>,
        };
        if (serverError) {
          throw serverError;
        }
      }
    });
  return response;
};

export const getPaginatedBrands = async (
  paginationModel: IPaginationBrandModel
) => {
  const response = await http
    .get<IPaginationRequest<IBrandModel>>(`api/brand/get?` + qs.stringify(paginationModel))

    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      if (error.request.status == 0) {
        throw ErrorStrings.backendNotResponse;
      }
      if (axios.isAxiosError(error)) {
        const serverError: BrandErrorType = {
          errorsString: error.response?.data as Array<string>,
        };
        if (serverError) {
          throw serverError;
        }
      }
    });

  return response;
};

export const addBrand = async (data: IBrandModel) => {
  data.title = "";
  const response = await http
    .post("api/brand/add", data)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        const serverError: IFluentValidationError = Object.assign(
          {},
          error.response?.data
        );
        serverError.errors = [];

        Object.keys(error.response?.data.errors).forEach((el1) => {
          error.response?.data.errors[el1].forEach((el2: string) => {
            serverError.errors.push(el2);
          });
        });
        // if (serverError) {
        //   throw serverError;
        // }
      }
    });
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
  const response = await http
    .delete(`api/brand/delete/${data}`)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        const serverError: BrandErrorType = {
          errorsString: error.response?.data as Array<string>,
        };
        if (serverError) {
          throw serverError;
        }
      }
    });
};
