import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IMAGES_PATH } from "../../../constants";
import { IRequestError } from "../../adminPanel/types";
import { getImagesByPostId } from "../../posts/postPage/service";
import { IProfileCarPreview } from "../types";
import defaultImage from "../../../assets/defaultImage.png";

export interface ICarPreviewProps {
  car: IProfileCarPreview;
}

const CarPreview = ({ car }: ICarPreviewProps) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [loadingImage, setLoadingImage] = useState<string>("");

  useEffect(() => {
    (async () => {
      loadImage();
    })();
  }, [car]);

  const loadImage = async () => {
    try {
      setImgSrc(loadingImage);
      const imgName = await getImagesByPostId(car.id);
      if (imgName && imgName[0] && (imgName[0] as string)) {
        setImgSrc(`${IMAGES_PATH}/${imgName[0]}_medium.png`);
      } else {
        setImgSrc(defaultImage);
      }
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      if (error && error.errors) {
        error.errors.forEach((e) => {
          toast.error(e);
        });
      }
      setImgSrc(defaultImage);
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
            </Row>
            <Row className="buttons-bar">
              <Link to={`/post/${car.id}`} className="link-button">
                Look
              </Link>
              <Link to="#" className="link-button">
                Deactivate
              </Link>
              <Link
                to={`/post/trend-adv-order?id=${car.id}`}
                className="advButton"
              >
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
