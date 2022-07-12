import { Button } from "antd";
import { Link } from "react-router-dom";
import AdvMainBanner from "./advMainBanner";
import SearchPanel from "./searchPanel";

const HomePage = () => {
  return (
    <>
      <div className="adb-main-container">
        <AdvMainBanner />
      </div>
      <SearchPanel />
    </>
  );
};
export default HomePage;
