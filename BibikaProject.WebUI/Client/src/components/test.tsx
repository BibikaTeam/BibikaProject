import { useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import Marquee from "react-fast-marquee";
import { getRandomPost } from "./home/service";
import { IBannerCar } from "./home/types";
import ITrendCarCard from "./posts/advertisment/trendCarCard";

const Test = () => {
  const [randomCar, setRandomCar] = useState<IBannerCar>();
  useEffect(() => {
    (async () => {
      const rc = await getRandomPost();
      setRandomCar(rc);
    })();
  }, []);

  console.log(randomCar);

  return (
    <div>
      {randomCar && (
        <>
          <Marquee
            direction="right"
            speed={40}
            style={{
              transform: "rotate(90deg)",
              width: "auto",
              overflow: "hidden",
            }}
          >
            <div style={{ transform: "rotate(-90deg)" }}>
              <ITrendCarCard car={randomCar} scale={0.8}></ITrendCarCard>
            </div>
            <div style={{ transform: "rotate(-90deg)" }}>
              <ITrendCarCard car={randomCar} scale={0.8}></ITrendCarCard>
            </div>
            <div style={{ transform: "rotate(-90deg)", marginTop: "10px" }}>
              <ITrendCarCard car={randomCar} scale={0.8}></ITrendCarCard>
            </div>
          </Marquee>
        </>
      )}
    </div>
  );
};

export default Test;
