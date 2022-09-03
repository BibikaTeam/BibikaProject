import { useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import Marquee from "react-fast-marquee";
import { getRandomPost } from "./home/service";
import { IBannerCar } from "./home/types";
import ITrendCarCard from "./posts/advertisment/trendCarCard";

const Test = () => {
  const imgSrc =
    "https://localhost:5001/images/9e74c71c-0662-4ff7-9a36-64cbbc4f1091_1fe34be7-9a98-40fc-aefe-9635b07d778a.png";

  return (
    <>
      <h1>TEST</h1>
      <div style={{ backgroundColor: "gray", width: "368px", height: "223px" }}>
        <img
          src={imgSrc}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "scale-down" }}
          loading="lazy"
        />
      </div>
    </>
  );
};

export default Test;
