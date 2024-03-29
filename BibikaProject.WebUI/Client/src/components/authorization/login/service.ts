import { AuthAction, AuthActionTypes, IUser } from "../types";
import jwt_decode from "jwt-decode";

export const AuthUser = (
  token: string,
  dispatch: React.Dispatch<AuthAction>
) => {
  const user = jwt_decode(token) as IUser;

  dispatch({
    type: AuthActionTypes.AUTH_LOGIN,
    payload: user,
  });
};
export const LogoutUser = (dispatch: React.Dispatch<AuthAction>) => {
  dispatch({
    type: AuthActionTypes.AUTH_LOGOUT,
  });
};
