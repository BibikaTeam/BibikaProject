export enum AuthActionTypes {
  AUTH_LOGIN = "AUTH_LOGIN",
  AUTH_LOGOUT = "AUTH_LOGOUT",
}
export interface IRegisterModel {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
export interface ILoginModel {
  email: string;
  password: string;
}
export interface IUser {
  id: string | null | undefined;
  nickname: string;
  email: string;
  role?: string | null | undefined;
}

export interface AuthState {
  user: null | IUser;
  isAuth: boolean;
}

export interface AuthLogin {
  type: AuthActionTypes.AUTH_LOGIN;
  payload: IUser;
}

export type AuthAction = AuthLogin;
