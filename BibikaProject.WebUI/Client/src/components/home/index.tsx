import { Button } from "antd";
import { Link } from "react-router-dom";
import TrendBlock from "../posts/advertisment/trendBlock";
import AdvMainBanner from "./advMainBanner";
import PopularBlock from "./popularBlock";
import SearchPanel from "./searchPanel";

const banner = require("../../assets/banner.png");

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="adb-main-container">
        <AdvMainBanner />
      </div>
      <SearchPanel />
      <TrendBlock />
      <PopularBlock />

      <img src={banner} alt="Banner" className="main-banner" />
    </div>
  );
};
export default HomePage;
