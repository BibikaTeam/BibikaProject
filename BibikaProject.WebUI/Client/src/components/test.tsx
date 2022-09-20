import { useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import Marquee from "react-fast-marquee";
import { getRandomPost } from "./home/service";
import { IBannerCar } from "./home/types";
import ITrendCarCard from "./posts/advertisment/trendCarCard";
import http from "../http_common";

const Test = () => {
  useEffect(() => {
    (async () => {
      const response = await http.get(`api/post/test`);
    })();
  }, []);

  return (
    <>
      <h1>TEST</h1>
    </>
  );
};

export default Test;
