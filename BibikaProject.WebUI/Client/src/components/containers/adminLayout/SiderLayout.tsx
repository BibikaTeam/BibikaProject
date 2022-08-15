import { FC, useState } from "react";
import { Outlet } from "react-router";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const SiderLayout: FC = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function onCollapse(): void {
    setCollapsed(!collapsed);
  }

  const menuItems = [
    {
      key: "/brand",
      label: "Brands",
    },
    {
      key: "/model",
      label: "Models",
    },
    {
      key: "/generation",
      label: "Generation",
    },
    {
      key: "/engine",
      label: "Engines",
    },
    {
      key: "/complete-set",
      label: "Complete sets",
    },
    {
      key: "/car",
      label: "Cars",
    },
  ];

  const handleMenuChange = (value: any) => {
    navigate(`/admin${value.key}`, { replace: false });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
          onClick={handleMenuChange}
        />
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
