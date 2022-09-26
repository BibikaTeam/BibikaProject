import { Button } from "antd";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IRequestError } from "../../adminPanel/types";
import MainPageCarCard from "../../home/carCard";
import { getRandomPost } from "../../home/service";
import { IBannerCar } from "../../home/types";
import { getPostById } from "../postPage/service";
import { IPostModel } from "../postPage/types";
import CarCard from "../result/carCard";
import { enableTrendOnPost } from "./service";
import TrendCarCard from "./trendCarCard";
import { useNavigate } from "react-router-dom";

// export interface AdvOrderPageProps {
//   car: IBannerCar;
// }

const TrendAdvOrder = () => {
  const navigator = useNavigate();
  const [selectedButton, setSelectedButton] = useState<number>(1);
  const [randomPost, setRandomPost] = useState<IBannerCar>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [car, setCar] = useState<IBannerCar>();

  useEffect(() => {
    (async () => {
      getRandomPostInside();

      const id = parseInt(searchParams.get("id") as string);

      //@ts-ignore
      const post: IBannerCar | undefined = await getPostById(id);
      if (post) post.year = new Date(post?.year as number).getFullYear();
      setCar(post);
    })();
  }, []);

  const onButtonTimesClick = (index: number) => {
    setSelectedButton(index);
  };

  const getSelectedPrice = () => {
    switch (selectedButton) {
      case 1:
        return 100;
      case 2:
        return 150;
      case 3:
        return 800;
      default:
        return 0;
    }
  };
  const getSelectedCount = () => {
    switch (selectedButton) {
      case 1:
        return 50;
      case 2:
        return 100;
      case 3:
        return 500;
      default:
        return 0;
    }
  };
  const buyTrendAdv = async () => {
    try {
      await enableTrendOnPost({
        postId: car?.id as number,
        views: getSelectedCount(),
      });
      navigator(`/post/banner-adv-order?id=${car?.id}`);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const getRandomPostInside = async () => {
    try {
      let data = await getRandomPost();
      setRandomPost(data);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  return (
    <div className="adv-selection">
      <div className="trend-selection row">
        <div className="left-trend-side col-6">
          <h1>TREND</h1>
          <h3>
            Be with <span className="header-selection">trend!</span>
          </h3>

          <span className="privilege">Be on many pages</span>
          <span className="privilege">Sell car faster</span>

          <div className="buttons-group">
            <button
              className={`button-trend-times-select ${
                selectedButton === 1 ? "active" : ""
              }`}
              onClick={() => onButtonTimesClick(1)}
            >
              50 shows
            </button>
            <button
              className={`button-trend-times-select ${
                selectedButton === 2 ? "active" : ""
              }`}
              onClick={() => onButtonTimesClick(2)}
            >
              100 shows
            </button>
            <button
              className={`button-trend-times-select ${
                selectedButton === 3 ? "active" : ""
              }`}
              onClick={() => onButtonTimesClick(3)}
            >
              500 shows
            </button>
          </div>
        </div>
        <div className="right-trend-side col-6">
          <div className="row">
            <div className="first-col col-3"></div>
            <div className="main-trend-banner col-6">
              {car && <TrendCarCard car={car as IBannerCar} scale={0.7} />}
            </div>
            <div className="third-col col-3"></div>
          </div>
        </div>
      </div>
      <div className="trend-description">
        <span className="trend-description-text">
          Upgrade your popularity only for{" "}
          <span className="price-trend-description">
            {getSelectedPrice()}uah
          </span>
          <span className="times-trend-description">/{getSelectedCount()}</span>
        </span>
        <div className="button-buy-group">
          <Link
            to={`/post/banner-adv-order?id=${car?.id}`}
            className="skip-trend-button"
          >
            Skip
          </Link>
          <button className="choose-trend-button" onClick={buyTrendAdv}>
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendAdvOrder;

// const car: IBannerCar = {
//   car: {
//     carBodyTitle: "",
//     completeSetTitle: "",
//     engine: {
//       title: "Disel",
//       capacity: "1488",
//       fuel: "Disel",
//       id: 0,
//       kwPower: 1,
//     },
//     gearBoxTitle: "Automatic",
//     id: 1,
//     title: "Audi Q8",
//   },
//   color: "blue",
//   likes: 10,
//   sellerName: "Eduard",
//   viewes: 1000,
//   year: 2022,
//   mileage: 2000,
//   location: "Lviv",
//   price: 85000,
//   id: 52,
//   description: "",
// };
