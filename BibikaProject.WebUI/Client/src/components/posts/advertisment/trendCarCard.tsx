import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ICarModel, IRequestError } from "../../adminPanel/types";
import { getImagesByPostId } from "../postPage/service";
import { IBannerCar } from "../../home/types";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import loadingImage from "../../../assets/loading.gif";
import defaultImage from "../../../assets/defaultImage.png";
import CarCardLoader from "../../common/ownElement/carCardLoader";

import TrendCardLoader from "./TrendCardLoader";

import { createChat } from "../../userCabinet/chat/service";

import { useNavigate } from "react-router-dom";
import { likePost } from "../../userCabinet/service";
import { getLikedPostNumbers } from "./service";
import { IMAGES_PATH } from "../../../constants";

export interface ITrendCarCardProps {
  car: IBannerCar;
  scale: number;
}

const TrendCarCard = ({ car, scale }: ITrendCarCardProps) => {
  const navigator = useNavigate();
  const [imgSrc, setImgSrc] = useState<string>("");
  const [likedPosts, setLikedPosts] = useState<Array<number>>();

  useEffect(() => {
    (async () => {
      loadImage();
      readUserLiked();
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

  const onHandleMessageWrite = async () => {
    await createChat(car.sellerEmail);
    navigator("/user-profile/chat");
  };

  const handleImgError = (ev: any) => {
    setImgSrc(defaultImage);
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
  const readUserLiked = async () => {
    try {
      const likedArr = localStorage.getItem("liked");
      if (!likedArr) {
        updateLikedPost();
      } else {
        setLikedPosts(likedArr?.split(",").map((x) => +x));
      }
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      if (error && error.errors) {
        error.errors.forEach((e) => {
          toast.error(e);
        });
      }
    }
  };
  const updateLikedPost = async () => {
    const result = await getLikedPostNumbers();
    setLikedPosts(result);
    if (result) localStorage.setItem("liked", result?.toString() as string);
  };

  return (
    <>
      {car && car != undefined ? (
        <div
          className="trend-car-card"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="like-button" onClick={onLikeClick}>
            {likedPosts?.includes(car.id) ? svgLiked : svgNoLiked}
          </div>

          <img src={imgSrc} alt="" onError={handleImgError} />
          <Link to={`/post/${car.id}`}>
            <div className="info-block">
              <span className="trend-title">{car.car.title}</span>
              <span className="trend-location">{car.location}</span>
              <div className="trend-tags-container">
                <span className="trend-tag">{car.year}</span>
                <span className="trend-tag">{car.mileage}km</span>
                <span className="trend-tag">{car.car.engine.title}</span>
              </div>
            </div>

            <hr />

            <div className="action-block">
              <div className="price-container">
                <span className="trend-price">{car.price}$</span>
              </div>
              <div className="buttons-container">
                <button className="write-btn" onClick={onHandleMessageWrite}>
                  Message
                </button>
                <button className="call-btn">
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
          </Link>
        </div>
      ) : (
        <TrendCardLoader />
      )}
    </>
  );
};
TrendCarCard.defaultProps = {
  scale: 1,
};

export default TrendCarCard;

const svgNoLiked = (
  <svg
    width="95"
    height="74"
    viewBox="0 0 95 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_0_1" fill="white">
      <path d="M0 0H95V64C95 69.5229 90.5229 74 85 74H10C4.47715 74 0 69.5229 0 64V0Z" />
    </mask>
    <path
      d="M0 0H95V64C95 69.5229 90.5229 74 85 74H10C4.47715 74 0 69.5229 0 64V0Z"
      fill="white"
      fill-opacity="0.3"
    />
    <path
      d="M0 0H95H0ZM96 64C96 70.0751 91.0751 75 85 75H10C3.92487 75 -1 70.0751 -1 64H1C1 68.9706 5.02944 73 10 73H85C89.9706 73 94 68.9706 94 64H96ZM10 75C3.92487 75 -1 70.0751 -1 64V0H1V64C1 68.9706 5.02944 73 10 73V75ZM96 0V64C96 70.0751 91.0751 75 85 75V73C89.9706 73 94 68.9706 94 64V0H96Z"
      fill="black"
      fill-opacity="0.2"
      mask="url(#path-1-inside-1_0_1)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M29.3717 22.4199C33.8672 17.86 41.156 17.86 45.6516 22.4199L48 24.8019L50.3484 22.4199C54.844 17.86 62.1328 17.86 66.6283 22.4199C71.1239 26.9797 71.1239 34.3727 66.6283 38.9325L51.0751 54.7081C49.3768 56.4307 46.6232 56.4307 44.9249 54.708L29.3717 38.9325C24.8761 34.3727 24.8761 26.9797 29.3717 22.4199Z"
      fill="white"
      fill-opacity="0.6"
      stroke="black"
      stroke-opacity="0.2"
      stroke-linecap="round"
    />
  </svg>
);

const svgLiked = (
  <svg
    width="95"
    height="74"
    viewBox="0 0 95 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_0_1" fill="white">
      <path d="M0 0H95V64C95 69.5229 90.5229 74 85 74H10C4.47715 74 0 69.5229 0 64V0Z" />
    </mask>
    <path
      d="M0 0H95V64C95 69.5229 90.5229 74 85 74H10C4.47715 74 0 69.5229 0 64V0Z"
      fill="#219CE1"
      fill-opacity="0.3"
    />
    <path
      d="M0 0H95H0ZM96 64C96 70.0751 91.0751 75 85 75H10C3.92487 75 -1 70.0751 -1 64H1C1 68.9706 5.02944 73 10 73H85C89.9706 73 94 68.9706 94 64H96ZM10 75C3.92487 75 -1 70.0751 -1 64V0H1V64C1 68.9706 5.02944 73 10 73V75ZM96 0V64C96 70.0751 91.0751 75 85 75V73C89.9706 73 94 68.9706 94 64V0H96Z"
      fill="black"
      fill-opacity="0.2"
      mask="url(#path-1-inside-1_0_1)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M29.3717 22.4199C33.8672 17.86 41.156 17.86 45.6516 22.4199L48 24.8019L50.3484 22.4199C54.844 17.86 62.1328 17.86 66.6283 22.4199C71.1239 26.9797 71.1239 34.3727 66.6283 38.9325L51.0751 54.7081C49.3768 56.4307 46.6232 56.4307 44.9249 54.708L29.3717 38.9325C24.8761 34.3727 24.8761 26.9797 29.3717 22.4199Z"
      fill="#219CE1"
      stroke="black"
      stroke-opacity="0.2"
      stroke-linecap="round"
    />
  </svg>
);
