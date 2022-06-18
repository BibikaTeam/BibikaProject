export enum AuthActionTypes {
  AUTH_LOGIN = "AUTH_LOGIN",
  AUTH_LOGOUT = "AUTH_LOGOUT",
}
export interface IRegisterModel {
  userName: string;
  email: string;
  password: string;
}

export interface ILoginModel {
  email: string;
  password: string;
}

export interface IUser {
  id: string | null | undefined;
  name: string;
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
export interface RegisterErrorType {
  errorsString: Array<string>;
}

export interface LoginErrorType {
  errorString: string;
}

export interface LoginResponseType {
  token: string;
  refreshToken: string;
  error: string;
}

export interface FacebookLoginModel {
  name?: string;
  email?: string;
  id: string;
}
