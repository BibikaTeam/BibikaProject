import { Button } from "antd";
import { Link } from "react-router-dom";
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
      <PopularBlock />

      <img src={banner} alt="Banner" className="main-banner" />
    </div>
  );
};
export default HomePage;
