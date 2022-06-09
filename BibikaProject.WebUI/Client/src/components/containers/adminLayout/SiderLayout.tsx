import { FC, useState } from "react";
import { Outlet } from "react-router";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const SiderLayout: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  function onCollapse(): void {
    setCollapsed(!collapsed);
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <div style={{ height: 32, margin: 16 }}></div>
          <Menu.Item>
            <Link to={"/admin/brand"}>Brand</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={"/admin/generation"}>Generation</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={"/admin/model"}>Model</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={"/admin/car"}>Car</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, color: "white" }}
        >
          Bibika Admin Panel
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Bibika Admin Panel Footer
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SiderLayout;
