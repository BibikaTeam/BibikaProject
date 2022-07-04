import { Outlet } from "react-router";
import { Radio, Select } from "antd";
import React from "react";
import DefaultFooter from "./DefaultFooter";
import Header from "./Header";
import SearchPanel from "./SearchPanel"
import "./headers.css";
import "./layout.css";
import { Carousel, Col, Row } from "antd";
import RegisterPage from "../../authorization/register";
import Search from "antd/lib/input/Search";
import AddPost from "../../posts/add";
import { Image } from "antd";
import { Button, Dropdown, Menu, message, Space, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";


const DefaultLayout = () => {
  return (
    <div className="defaultPositions">
      
      <div>
        <Header /></div>

        <div>
          <Outlet />
         </div>

          <div><SearchPanel/></div>

         

      
      <div>
      <DefaultFooter />
    </div>
    </div>
  );
};
export default DefaultLayout;
