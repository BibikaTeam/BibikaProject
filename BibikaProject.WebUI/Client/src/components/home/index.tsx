import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IRequestError } from "../adminPanel/types";
import TrendBlock from "../posts/advertisment/trendBlock";
import AdvMainBanner from "./advMainBanner";
import PopularBlock from "./popularBlock";
import SearchPanel from "./searchPanel";
import { getRandomBannerPost } from "./service";
import { IBannerCar } from "./types";

const banner = require("../../assets/banner.png");

const HomePage = () => {
  const [bannerCar, setBannerCar] = useState<IBannerCar>();

  useEffect(() => {
    (async () => {
      try {
        const trendBanner = await getRandomBannerPost();
        setBannerCar(trendBanner);
      } catch (_error) {
        const error: IRequestError = _error as IRequestError;
        error.errors.forEach((e) => {
          toast.error(e);
        });
      }
    })();
  }, []);

  return (
    <div className="home-page">
      <div className="adb-main-container">
        <AdvMainBanner
          car={bannerCar as IBannerCar}
          loading={bannerCar != null && bannerCar != undefined}
        />
      </div>
      <SearchPanel />
      <TrendBlock />
      <PopularBlock />

      <img src={banner} alt="Banner" className="main-banner" />
    </div>
  );
};
export default HomePage;
