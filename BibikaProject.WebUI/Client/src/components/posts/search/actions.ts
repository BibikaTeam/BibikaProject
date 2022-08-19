import axios from "axios";
import { IPaginationRequest, IRequestError } from "../../adminPanel/types";
import { IBannerCar } from "../../home/types";
import { SearchAction, SearchActionTypes } from "./types";

export const writeCars = (data: IPaginationRequest<IBannerCar>) => {
  return async (dispatch: React.Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionTypes.SET_CAR_RESULT,
      payload: data,
    });
  };
};
