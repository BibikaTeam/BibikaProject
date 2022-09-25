import * as React from "react";
import {
  AuthAction,
  ILoginModel,
  AuthActionTypes,
  IUser,
  LoginResponseType,
  LoginErrorType,
  FacebookLoginModel,
} from "../types";

import http from "../../../http_common"; //axios
import axios, { AxiosError, AxiosResponse } from "axios";

import jwt_decode from "jwt-decode";

import { IRequestError } from "../../adminPanel/types";
import { ErrorStrings } from "../../../constants";
import { CredentialResponse } from "@react-oauth/google";

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
      return Promise.reject();
    }
  };
};

export const loginGoogleUser = (data: CredentialResponse) => {
  return async (dispatch: React.Dispatch<AuthAction>) => {
    try {
      const response = await http
        .post<LoginResponseType>("/api/google-login", data)
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

export const loginFacebookUser = (data: FacebookLoginModel) => {
  return async (dispatch: React.Dispatch<AuthAction>) => {
    try {
      const response = await http
        .post<LoginResponseType>("/api/facebook-login", data)
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

export const logoutUser = () => {
  return async (dispatch: React.Dispatch<AuthAction>) => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("likes");

    dispatch({
      type: AuthActionTypes.AUTH_LOGOUT,
    });
  };
};
