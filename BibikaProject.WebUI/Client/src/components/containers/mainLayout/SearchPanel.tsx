import { Outlet } from "react-router";
import { Radio, Select } from "antd";
import React from "react";
import "./headers.css";
import "./layout.css";
import { Carousel, Col, Row } from "antd";
import RegisterPage from "../../authorization/register";
import Search from "antd/lib/input/Search";
import AddPost from "../../posts/add";
import { Image } from "antd";
import { Button, Dropdown, Menu, message, Space, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const { Option } = Select;
const children: {} | null | undefined = [];
const handleChange = (value: any) => {
  console.log(`Selected: ${value}`);
};

const menu = (
  <Menu
    items={[
      {
        label: "cars",
        key: "1"
         
      },
      {
        label: "trucks",
        key: "2",
     
      },
      {
        label: "motorcycles",
        key: "3",
      
      },
    ]}
  />
);

const SearchPanel = () => {
  return (
    <div className="container pad pb-4">
      <div>
        <Row className="layout-container ">
          <Image
            width={600}
            height={400}
            src="https://scuffedentertainment.com/wp-content/uploads/2021/11/what-car-suits-you-best-quiz-1024x576.jpg"
          />
        </Row>
      </div>

      <div className="button ">
        <div>
          <Radio.Group>
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="new">New</Radio.Button>
            <Radio.Button value="used">Used</Radio.Button>
          </Radio.Group>
        </div>

        <div className="button ">
          <Row >
            <Col span={24} >
              <Row>
                <Space wrap>
                  <Dropdown overlay={menu}>
                    <Button
                      style={{
                        width: 300,
                      }}
                    >
                      <Space>
                        Type
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </Space>

                <Select
                  defaultValue="Brands"
                  onChange={handleChange}
                  style={{
                    width: 300,
                  }}
                >
                  {children}
                </Select>
                <Select
                  defaultValue="Model"
                  onChange={handleChange}
                  style={{
                    width: 300,
                  }}
                >
                  {children}
                </Select>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <div className="carcontainer">
        <Row>
          
            <Col span={8}>
              <Image src="https://hips.hearstapps.com/hmg-prod/images/294061-v60-cross-country-b5-awd-onyx-black-1647010666.jpg?crop=0.871xw:0.653xh;0.0505xw,0.256xh&resize=1200:*" />
              <span style={{ color: "black" }}>New cars</span>
            </Col>
          
          <Col span={8}>
            <Image src="https://hips.hearstapps.com/hmg-prod/images/2021-mercedes-benz-e450-4matic-sedan-107-1604280340.jpg?crop=0.728xw:0.613xh;0.181xw,0.240xh&resize=1200:*" />
          </Col>
          <Col span={8}>
            <Image src="https://hips.hearstapps.com/hmg-prod/images/2022-honda-civic-sedan-110-1623810388.jpg?crop=0.796xw:0.673xh;0.0817xw,0.219xh&resize=1200:*" />
          </Col>
        </Row>
      </div>
      <div className="layout-container">
        <Row>
          <Col span={24}>
            {/* <Image src="./img/290846407_360631912808929_4741574811869240986_n.jpg" /> */}
            <Image src="/img/290846407_360631912808929_4741574811869240986_n.jpg"></Image>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default SearchPanel;
