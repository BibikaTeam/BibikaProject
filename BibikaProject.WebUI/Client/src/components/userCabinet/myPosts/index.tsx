import { useEffect, useState } from "react";
import CarPreview from "../common/carPreview";
import { IProfileCarPreview } from "../types";
import { getUserCars } from "./service";

const MyPosts = () => {
  const [userCars, setUserCars] = useState<Array<IProfileCarPreview>>([]);

  useEffect(() => {
    (async () => {
      const cars = await getUserCars();
      setUserCars(cars as IProfileCarPreview[]);
    })();
  }, []);
  const testCar: IProfileCarPreview = {
    likes: 293,
    views: 4100,
    messages: 27,
    mainImageSrc:
      "https://i.wpimg.pl/1920x0/m.autokult.pl/audi-q5-5-02cd50a10925afcdcc53ca.jpg",
    location: "Kyiv",
    price: 67000,
    title: "Audi Q8 S Line",
    id: 52,
  };
  return (
    <>
      <div className="my-cars">
        {userCars !== null && userCars.length !== 0
          ? userCars.map((x) => <CarPreview car={x}></CarPreview>)
          : ""}
      </div>
    </>
  );
};

export default MyPosts;
