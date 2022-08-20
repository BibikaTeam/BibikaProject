import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IRequestError } from "../../adminPanel/types";
import { getImagesByPostId } from "../../posts/postPage/service";
import { IProfileCarPreview } from "../types";

export interface ICarPreviewProps {
  car: IProfileCarPreview;
}

const CarPreview = ({ car }: ICarPreviewProps) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  useEffect(() => {
    (async () => {
      loadImage();
    })();
  }, [imgSrc]);

  const loadImage = async () => {
    try {
      const imgName = await getImagesByPostId(car.id);
      if (imgName && imgName[0] && (imgName[0] as string)) {
        setImgSrc(`https://localhost:5001/images/${imgName[0]}_medium.png`);
      }
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  return (
    <Row className="carPreviewContainer">
      <Col flex="500px" className="imageCol">
        <img src={imgSrc} alt="Car preview image" />
      </Col>
      <Col flex="auto" className="info">
        <Row className="upLine" justify="space-between">
          <Col>
            <Link to={`/post/${car.id}`}>
              <span className="carTitle">{car.title}</span>
            </Link>
            <span className="location">{car.location}</span>
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
                <span className="statistic-info">{car.views}</span>
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
              <Link to={`/post/adv-order?id=${car.id}`} className="advButton">
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
