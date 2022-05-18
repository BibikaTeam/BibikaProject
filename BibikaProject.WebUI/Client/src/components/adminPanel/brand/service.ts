import { IBrandModel, BrandErrorType } from "../types"
import http from "../../../http_common"
import axios from "axios";

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
  
}


export const addBrand = async (data: IBrandModel) => {
  const response = await http
    .post("api/brand/add", data)
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

export const updateBrand = async (data: IBrandModel) => {
 const response = await http
  .put("api/brand/update")
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
}

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
}

