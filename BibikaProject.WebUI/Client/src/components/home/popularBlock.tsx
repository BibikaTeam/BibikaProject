import MainPageCarCard from "./carCard";

const PopularBlock = () => {
  return (
    <div className="popular-block">
      <h2>Popular</h2>
      <div className="cars-cards">
        <MainPageCarCard />
        <MainPageCarCard />
        <MainPageCarCard />
      </div>
    </div>
  );
};
export default PopularBlock;
