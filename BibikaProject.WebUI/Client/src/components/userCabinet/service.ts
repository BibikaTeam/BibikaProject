import http from "../../http_common";
import axios from "axios";
import { IRequestError } from "../adminPanel/types";
import { ErrorStrings } from "../../constants";

export const getLikedMyPost = async () => {
  try {
    const response = await http.get("api/post/get/user-liked");

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

// export const getViewsPost = async () => {
//   try {
//     const response = await http.get("");
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.request.status == 0 || error.request.status == 500) {
//         const unknownError: IRequestError = {
//           code: error.request.status,
//           errors: new Array<string>(ErrorStrings.backendNotResponse()),
//         };
//         throw unknownError;
//       }
//       let serverError: IRequestError = {
//         errors: error.response?.data.Errors,
//         code: error.response?.data.Code,
//       };
//       throw serverError;
//     }
//   }
// };

export const likePost = async (postId: number) => {
  try {
    const response = await http.post(`api/user/like/?postId=${postId}`);
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

export const viewPost = async (postId: number) => {
  try {
    const response = await http.post(`api/user/view/?postId=${postId}`);
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

// export const getAllPost = async () => {
//   try {
//     const response = await http.get("api/post/get/all")

//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.request.status == 0 || error.request.status == 500) {
//         const unknownError: IRequestError = {
//           code: error.request.status,
//           errors: new Array<string>(ErrorStrings.backendNotResponse()),
//         };
//         throw unknownError;
//       }
//       let serverError: IRequestError = {
//         errors: error.response?.data.Errors,
//         code: error.response?.data.Code,
//       };
//       throw serverError;
//     }
//   }
// }