
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
import { Image } from 'antd';

const DefaultLayout = () => {
  return (
    <div className="defaultPositions">
      <div>
        <Header />
        <div className="container pad pb-4">
          
          <Outlet />


          
  <div  >
    <Row className="layout-container ">
    <Image
    width={600}
    height={400}
    src="https://scuffedentertainment.com/wp-content/uploads/2021/11/what-car-suits-you-best-quiz-1024x576.jpg"
  />
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
    </Row>

    </div>
    <Row>
      <Col span={8}><Image
    
    src="https://hips.hearstapps.com/hmg-prod/images/294061-v60-cross-country-b5-awd-onyx-black-1647010666.jpg?crop=0.871xw:0.653xh;0.0505xw,0.256xh&resize=1200:*"
  /></Col>
      <Col span={8}><Image
    
    src="https://hips.hearstapps.com/hmg-prod/images/2021-mercedes-benz-e450-4matic-sedan-107-1604280340.jpg?crop=0.728xw:0.613xh;0.181xw,0.240xh&resize=1200:*"
  /></Col>
      <Col span={8}><Image
    
    src="https://hips.hearstapps.com/hmg-prod/images/2022-honda-civic-sedan-110-1623810388.jpg?crop=0.796xw:0.673xh;0.0817xw,0.219xh&resize=1200:*"
  /></Col>
    </Row></div>
    <Row>
      <Col span={24}>
      <Image
    
    src="./img/290846407_360631912808929_4741574811869240986_n.jpg"
  /></Col>
      
    </Row>
  </div>


      </div>
      <DefaultFooter />
    </div>
  );
};
export default DefaultLayout;