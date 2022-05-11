import { IBrandModel, BrandErrorType } from "../types"
import http from "../../../http_common"
import axios from "axios";

// export const brandAdd = async (data: IBrandModel) => {
//     const response = await http
//       .post("api/brand/add", data)
//       .catch(function (error) {
//         if (axios.isAxiosError(error)) {
//           const serverError: BrandErrorType = {
//             errorsString: error.response?.data as Array<string>,
//           };
//           if (serverError) {
//             throw serverError;
//           }
//         }
//       });
// };

export const brandAdds = async (data: IBrandModel) => {
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