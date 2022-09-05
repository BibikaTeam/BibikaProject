import { useEffect, useState } from "react";
import { IBannerCar } from "../../home/types";
import { getRandomTrendPost } from "./service";
import TrendCarCard from "./trendCarCard";

const TrendBlock = () => {
  // const car: IBannerCar = {
  //   title: "Tesla Model S",
  //   engine: "Electro",
  //   gearBoxTitle: "Automatic",
  //   location: "Kyiv",
  //   mainImageSrc:
  //     "https://tesla-cdn.thron.com/delivery/public/image/tesla/8a74d206-66dc-4386-8c7a-88ff32174e7d/bvlatuR/std/4096x2560/Model-S-Main-Hero-Desktop-LHD",
  //   mileage: 24000,
  //   price: 67000,
  //   year: 2020,
  //   id: 0,
  // };

  const [postArray, setPostArray] = useState<Array<IBannerCar>>([]);

  useEffect(() => {
    (async () => {
      let post: IBannerCar | null | undefined = null;
      const tmpArr: Array<IBannerCar> = [];
      for (let i = 0; i <= 2; i++) {
        post = await getRandomTrendPost();
        tmpArr.push(post as IBannerCar);
      }
      setPostArray(tmpArr);
    })();
  }, []);

  console.log("postArr: ", postArray);

  return (
    <div className="trend-block">
      <h2>Trends</h2>
      <div className="cars-cards">
        <TrendCarCard car={postArray[0]} />
        <TrendCarCard car={postArray[1]} />
        <TrendCarCard car={postArray[2]} />
      </div>
    </div>
  );
};
export default TrendBlock;
