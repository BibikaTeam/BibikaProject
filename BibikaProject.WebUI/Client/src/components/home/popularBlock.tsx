import { useEffect, useState } from "react";
import MainPageCarCard from "./carCard";
import { getRandomPost } from "./service";
import { IBannerCar } from "./types";

const PopularBlock = () => {
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
        post = await getRandomPost();
        tmpArr.push(post as IBannerCar);
      }
      setPostArray(tmpArr);
    })();
  }, []);

  console.log("postArr: ", postArray);

  return (
    <div className="popular-block">
      <h2>Popular</h2>
      <div className="cars-cards">
        {postArray[0] && <MainPageCarCard car={postArray[0]} />}
        {postArray[1] && <MainPageCarCard car={postArray[1]} />}
        {postArray[2] && <MainPageCarCard car={postArray[2]} />}
      </div>
    </div>
  );
};
export default PopularBlock;
