import { isInteger } from "formik";

export class CodesDescriptionService {
  static giveErrorDescription(errorCode: number | undefined | string) {
    if (isInteger(errorCode))
      switch (errorCode) {
        case 404:
          return "Not found";
        case 401:
          return "You haven't enough permitted";
        case 500:
          return "Backend not respond. Try again later";
        default:
          return "Unknown error";
      }
  }
}
