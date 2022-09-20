import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IMAGES_PATH } from "../../../constants";
import { IRequestError } from "../../adminPanel/types";
import { IBannerCar } from "../../home/types";
import { createChat } from "../../userCabinet/chat/service";
import { likePost } from "../../userCabinet/service";
import { getLikedPostNumbers } from "../advertisment/service";
import { getImagesByPostId } from "../postPage/service";
import { useNavigate } from "react-router-dom";

export interface ICarCardProps {
  car: IBannerCar;
}

const CarCard = ({ car }: ICarCardProps) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const navigator = useNavigate();

  useEffect(() => {
    (async () => {
      loadImage();
    })();
  }, [imgSrc]);

  const loadImage = async () => {
    try {
      const imgName = await getImagesByPostId(car.id);
      if (imgName && imgName[0] && (imgName[0] as string)) {
        setImgSrc(`${IMAGES_PATH}/${imgName[0]}_medium.png`);
      }
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const updateLikedPost = async () => {
    const result = await getLikedPostNumbers();
    if (result) localStorage.setItem("liked", result?.toString() as string);
  };

  const onLikeClick = async () => {
    try {
      await likePost(car.id);
      updateLikedPost();
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      if (error && error.errors) {
        error.errors.forEach((e) => {
          toast.error(e);
        });
      }
    }
  };
  const onHandleMessageWrite = async () => {
    await createChat(car.sellerEmail);
    navigator("/user-profile/chat");
  };

  return (
    <Link to={"/post/" + car.id}>
      <div className="car-card">
        <div className="images">
          <img src={imgSrc} alt="" />
        </div>

        <div className="blocks">
          <div className="info-block">
            <div className="info-row">
              <div>
                <span className="title">{car.car.title}</span>
              </div>
              <div className="second-row">
                <span className="location">{car.location}</span>
                <div className="tags-row">
                  <span className="tag">{car.year}</span>
                  <span className="tag">{car.mileage}km</span>
                  <span className="tag">{car.car.engine.title}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="description-block">
            <p>{car.description}</p>
          </div>

          <div className="price-block">
            <div className="left-price-side">
              <span className="price">{car.price}$</span>
              <span className="sub-price">·</span>
              <span className="sub-price">{car.price * 30}₴</span>
            </div>
            <div className="right-price-side">
              <button className="message-btn btn" onClick={onLikeClick}>
                Like
              </button>
              <span> </span>
              <Link to={"/"}>
                <button
                  className="message-btn btn"
                  onClick={onHandleMessageWrite}
                >
                  Message
                </button>
              </Link>
              <button className="call-btn btn">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.20084 1.96246L8.20085 1.96248L11.7906 6.57417C11.7907 6.57428 11.7908 6.57438 11.7909 6.57448C12.2597 7.17752 12.4254 7.96348 12.2398 8.7057L12.2398 8.70591L11.1458 13.0859L11.1457 13.0863C11.0474 13.4805 11.0527 13.8933 11.1611 14.2848C11.2695 14.6763 11.4772 15.0332 11.7642 15.3207L11.7649 15.3213L16.6789 20.2353L16.6792 20.2357C16.9671 20.5233 17.3245 20.7314 17.7167 20.8398C18.1086 20.9481 18.5219 20.9531 18.9164 20.8544C18.9166 20.8543 18.9168 20.8543 18.9171 20.8542L23.2944 19.7604L23.2945 19.7604C23.6607 19.6688 24.0429 19.6617 24.4122 19.7396C24.7815 19.8174 25.1283 19.9783 25.4264 20.2099L30.0379 23.7975C31.2217 24.7186 31.3289 26.4665 30.2713 27.5226L30.2709 27.5231L28.2029 29.5911C26.962 30.832 25.1451 31.3424 23.4881 30.759L23.4879 30.7589C18.3519 28.9518 13.6886 26.0115 9.84407 22.1561L9.84205 22.1541C5.98702 18.3102 3.04679 13.6478 1.23939 8.51266C0.657628 6.85736 1.16822 5.03819 2.40907 3.79734L4.47654 1.72987C4.47657 1.72985 4.47659 1.72982 4.47662 1.72979C4.72628 1.48053 5.02606 1.28716 5.3561 1.16251C5.68617 1.03784 6.03897 0.984742 6.39111 1.00673C6.74326 1.02873 7.08671 1.12531 7.39871 1.29007C7.7107 1.45484 7.98412 1.68403 8.20084 1.96246Z"
                    stroke="#E06738"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
