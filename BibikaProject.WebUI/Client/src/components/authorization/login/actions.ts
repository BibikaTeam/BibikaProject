import * as React from "react";
import { AuthAction, ILoginModel, AuthActionTypes, IUser } from "../types";

import http from "../../../http_common"; //axios
import axios, { AxiosError } from "axios";

// import jwt_decode from "jwt-decode";

export const loginUser = (data: ILoginModel) => {
  return async (dispatch: React.Dispatch<AuthAction>) => {
    try {
      // const response = await http.post("/api/login", data);

      // const { token } = response.data.data;
      // const { refreshToken } = response.data.data;

      // localStorage.token = token;
      // localStorage.refreshToken = refreshToken;

      // const user = jwt_decode(token) as IUser;

      // //Write to redux
      // dispatch({
      //   type: AuthActionTypes.AUTH_LOGIN,
      //   payload: user,
      // });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
