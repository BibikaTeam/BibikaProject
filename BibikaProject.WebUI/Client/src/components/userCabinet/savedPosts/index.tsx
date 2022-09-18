import { useEffect, useState } from "react";
import { IBannerCar } from "../../home/types";
import { getLikedPost } from "../../posts/advertisment/service";
import TrendCarCard from "../../posts/advertisment/trendCarCard";

const SavedPosts = () => {
  const [cars, setCars] = useState<Array<IBannerCar>>([]);
  useEffect(() => {
    (async () => {
      const _cars = await getLikedPost();
      if (_cars) setCars(_cars);
    })();
  }, []);

  return (
    <div className="saved-posts">
      <h1>Saved posts</h1>

      <div className="cars-container">
        {cars &&
          cars.map((x) => (
            <>
              <TrendCarCard car={x} />
              <TrendCarCard car={x} />
              <TrendCarCard car={x} />
              <TrendCarCard car={x} />
              <TrendCarCard car={x} />
            </>
          ))}
      </div>
    </div>
  );
};
export default SavedPosts;
