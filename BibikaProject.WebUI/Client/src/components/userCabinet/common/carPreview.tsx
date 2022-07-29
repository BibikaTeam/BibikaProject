import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { IProfileCarPreview } from "../types";

export interface ICarPreviewProps {
  car: IProfileCarPreview;
}

const CarPreview = ({ car }: ICarPreviewProps) => {
  return (
    <Row className="carPreviewContainer">
      <Col flex="500px" className="imageCol">
        <img src={car.mainImageSrc} alt="Car preview image" />
      </Col>
      <Col flex="auto" className="info">
        <Row className="upLine" justify="space-between">
          <Col>
            <span className="carTitle">{car.title}</span>
            <span className="location">{car.place}</span>
          </Col>
          <Col style={{ lineHeight: "55px" }}>
            <span className="price">{car.price}$</span>
          </Col>
        </Row>
        <Row className="downLine">
          <Col style={{ width: "100%" }}>
            <Row className="status-info" justify="start">
              <Col className="statistic-cell">
                <span className="icon like"></span>
                <span className="statistic-info">{car.likes}</span>
              </Col>
              <Col className="statistic-cell">
                <span className="icon watch"></span>
                <span className="statistic-info">{car.watches}</span>
              </Col>
              <Col className="statistic-cell">
                <span className="icon message"></span>
                <span className="statistic-info">{car.messages}</span>
              </Col>
            </Row>
            <Row className="buttons-bar">
              <Link to="#" className="editButton">
                Edit
              </Link>
              <Link to="#" className="link-button">
                Look
              </Link>
              <Link to="#" className="link-button">
                Deactivate
              </Link>
              <Link to="#" className="advButton">
                Adv
              </Link>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CarPreview;
