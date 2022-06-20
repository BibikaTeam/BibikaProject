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
}

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

          console.log(1);      
          //Write to redux
          dispatch({
            type: AuthActionTypes.AUTH_LOGIN,
            payload: user,
          });
        });

        console.log(2);
      
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
}
