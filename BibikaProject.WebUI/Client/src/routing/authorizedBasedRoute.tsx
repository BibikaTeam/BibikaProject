import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

import { Constants } from "../constants";
import NotPermittedPage from "../components/noMatch/NotPermittedPage";

const AuthorizedBasedRoute = () => {
  const { user } = useTypedSelector((redux) => redux.login);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthorizedBasedRoute;
// import * as React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// export interface RoleBasedRouteProps {
//   element: JSX.Element;
//   path: string;
// }

// function RoleBasedRoute({ element, path }: RoleBasedRouteProps) {
//   return <Route path={path} element={element} />;
// }

// export default RoleBasedRoute;
