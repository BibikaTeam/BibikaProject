import axios from "axios";
import { ErrorStrings } from "../../../constants";
import http from "../../../http_common";
import { IRequestError } from "../../adminPanel/types";
import { IBannerCar } from "../../home/types";

export interface IEnableTrendOnPostProps {
  postId: number;
  views: number;
}

export const enableTrendOnPost = async ({
  postId,
  views,
}: IEnableTrendOnPostProps) => {
  try {
    const response = await http.put(
      `api/adv/enable-trend?postId=${postId}&addViews=${views}`
    );
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
export const enableBannerOnPost = async ({
  postId,
  views,
}: IEnableTrendOnPostProps) => {
  try {
    const response = await http.put(
      `api/adv/enable-banner?postId=${postId}&addViews=${views}`
    );
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
export const addMoneyToPost = async ({
  postId,
  views,
}: IEnableTrendOnPostProps) => {
  try {
    const response = await http.put(
      `api/adv/add-money?postId=${postId}&amount=${views}`
    );
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

export const getRandomTrendPost = async () => {
  try {
    const response = await http.get<IBannerCar>(`api/adv/get/random-trend`);

    response.data.year = new Date(response.data.year).getFullYear();

    const post = response.data;

    return post;
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
export const getLikedPostNumbers = async () => {
  try {
    const response = await http.get<Array<IBannerCar>>(
      `api/post/get/user-liked`
    );

    var result = response.data.map(({ id }) => id);

    return result;
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
export const getLikedPost = async () => {
  try {
    const response = await http.get<Array<IBannerCar>>(
      `api/post/get/user-liked`
    );

    const res = response.data.slice();

    res.map((x) => {
      //@ts-ignore
      x.year = new Date(Date.parse(x.year)).getFullYear();
    });

    return res;
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
