import * as React from "react";
import {
  AuthAction,
  ILoginModel,
  AuthActionTypes,
  IUser,
  LoginResponseType,
  LoginErrorType,
} from "../types";

import http from "../../../http_common"; //axios
import axios, { AxiosError, AxiosResponse } from "axios";

import jwt_decode from "jwt-decode";

export const loginUser = (data: ILoginModel) => {
  return async (dispatch: React.Dispatch<AuthAction>) => {
    try {
      const response = await http
        .post<LoginResponseType>("/api/login", data)
        .then((data) => {
          const { token, refreshToken } = (data as AxiosResponse).data;

          localStorage.token = token;
          localStorage.refreshToken = refreshToken;

          const user = jwt_decode(token) as IUser;

          //Write to redux
          dispatch({
            type: AuthActionTypes.AUTH_LOGIN,
            payload: user,
          });
        });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError: LoginErrorType = {
          errorString: error.response?.data as string,
        };
        if (serverError) {
          return Promise.reject(serverError);
        }
      }
      return Promise.reject();
    }
  };
};
