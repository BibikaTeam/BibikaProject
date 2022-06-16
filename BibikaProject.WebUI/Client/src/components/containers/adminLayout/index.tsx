import React from "react";
import { Outlet } from "react-router";
import SiderLayout from "./SiderLayout";

const AdminLayout = () => {
  return (
    <SiderLayout>
      <Outlet />
    </SiderLayout>
  );
};

export default AdminLayout;
