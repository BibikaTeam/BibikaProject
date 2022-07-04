
import { Outlet } from 'react-router';
import { Button, Radio } from 'antd';
import React from 'react';
import DefaultFooter from './DefaultFooter';
import Header from './Header';
import './headers.css';
import './layout.css';
import { Carousel, Col, Row } from 'antd';
import RegisterPage from '../../authorization/register';
import Search from 'antd/lib/input/Search';
import AddPost from '../../posts/add';
import { Dropdown, Menu, message, Space, Tooltip } from 'antd';


const DefaultLayout = () => {
  return (
    <div className="defaultPositions">
      <div>
        <Header />
        <div className="container pad pb-4">
          
          <Outlet />
        </div>
  <div  >
    <Row className="layout-container ">
      <Col span={24}>Головна машина</Col>
    </Row> 
    
    <div className="layout-container " >
    <Radio.Group  ><div >
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="new">New</Radio.Button>
        <Radio.Button value="used">Used</Radio.Button>
        </div>
      </Radio.Group>
      <Row >
      <Col span={24} >
  
    </Col>
    </Row></div>


    <Row>
      <Col span={8}>Рекомендовані авто</Col>
      <Col span={8}>Рекомендовані авто</Col>
      <Col span={8}>Рекомендоване авто</Col>
    </Row>
    <Row>
      <Col span={24}>
        Реклама</Col>
      
    </Row>
  </div>


      </div>
      <DefaultFooter />
    </div>
  );
};
export default DefaultLayout;