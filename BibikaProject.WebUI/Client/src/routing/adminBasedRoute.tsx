import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

import { Constants } from "../constants";
import NotPermittedPage from "../components/noMatch/NotPermittedPage";

const AdminBasedRoute = () => {
  const { user } = useTypedSelector((redux) => redux.login);
  const isAdmin = user?.role === Constants.AdminRole();

  return user ? (
    isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/error/401" replace />
    )
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminBasedRoute;
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
