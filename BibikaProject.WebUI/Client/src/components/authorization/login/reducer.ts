import { AuthAction, AuthActionTypes, AuthState } from "../types";

const initialState: AuthState = {
  user: {
    id: "0",
    name: "",
    email: "",
    role: "",
  },
  isAuth: false,
};

export const loginReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_LOGIN: {
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};
