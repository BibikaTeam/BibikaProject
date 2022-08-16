import axios from "axios";
import { ErrorStrings } from "../../constants";
import http from "../../http_common";
import { IPaginationRequest, IRequestError } from "../adminPanel/types";
import {
  IBannerCar,
  IShortCarsCarsRequest,
  IShortSearchRespond,
} from "./types";

export const getRandomPost = async () => {
  try {
    const response = await http.get<IBannerCar>(`api/post/get/random`);

    const post = response.data;

    //@ts-ignore;
    post.engine = post.car.engine.capacity + " " + post.car.engine.fuel;
    //@ts-ignore;
    post.title = post.car.title;
    //@ts-ignore;
    post.year = new Date(Date.parse(post.year)).getFullYear();

<<<<<<< HEAD
    post.mainImageSrc =
      "https://tesla-cdn.thron.com/delivery/public/image/tesla/8a74d206-66dc-4386-8c7a-88ff32174e7d/bvlatuR/std/4096x2560/Model-S-Main-Hero-Desktop-LHD";
=======
    // post.mainImageSrc =
    // "https://tesla-cdn.thron.com/delivery/public/image/tesla/8a74d206-66dc-4386-8c7a-88ff32174e7d/bvlatuR/std/4096x2560/Model-S-Main-Hero-Desktop-LHD";
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a

    post.price = 100;

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

export const shortSearch = async (params: IShortSearchRespond) => {
  try {
    const searchString = "api/post/get/";
    let searchValue = params.generation as number;
    if (params.generation === null) {
      searchString.concat("by-model/");
      searchValue = params.model as number;
    }

    const request: IShortCarsCarsRequest = {
      searchId: searchValue,
      countOnPage: 10,
      page: 1,
      search: "",
    };
    const response = await http.post<IPaginationRequest<IBannerCar>>(
      searchString,
      request
    );

    const posts = response.data;
    posts.data.map((post) => {
      //@ts-ignore;
      post.engine = post.car.engine.capacity + " " + post.car.engine.fuel;
      //@ts-ignore;
      post.title = post.car.title;
      //@ts-ignore;
      post.year = new Date(Date.parse(post.year)).getFullYear();

<<<<<<< HEAD
      post.mainImageSrc =
        "https://tesla-cdn.thron.com/delivery/public/image/tesla/8a74d206-66dc-4386-8c7a-88ff32174e7d/bvlatuR/std/4096x2560/Model-S-Main-Hero-Desktop-LHD";
=======
      // post.mainImageSrc =
      // "https://tesla-cdn.thron.com/delivery/public/image/tesla/8a74d206-66dc-4386-8c7a-88ff32174e7d/bvlatuR/std/4096x2560/Model-S-Main-Hero-Desktop-LHD";
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a

      post.description =
        "TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | TEST DESCRIPTION | ";

      post.price = 100;
    });

    return posts;
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
