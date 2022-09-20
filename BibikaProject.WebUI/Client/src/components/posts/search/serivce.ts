import axios from "axios";
import { ErrorStrings } from "../../../constants";
import http from "../../../http_common";
import { IPaginationRequest, IRequestError } from "../../adminPanel/types";
import { IBannerCar } from "../../home/types";
import { IDetailSearchProps, IMinMaxYearPriceDTO } from "./types";

export const getMinMaxYearPriceByGeneration = async (generationId: number) => {
  try {
    const response = await http.get<IMinMaxYearPriceDTO>(
      `api/post/get/min-max-values/${generationId}`
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

export const getDetailPaginatedPosts = async (
  filterProps: IDetailSearchProps
) => {
  try {
    const response = await http.post<IPaginationRequest<IBannerCar>>(
      `api/post/get`,
      filterProps
    );

    response.data.data.map((x) => (x.year = new Date(x.year).getFullYear()));

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
