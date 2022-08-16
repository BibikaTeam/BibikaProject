import CarPreview from "./common/carPreview";
import { IProfileCarPreview } from "./types";

<<<<<<< HEAD
const UserProfile = () => {
=======
const UserProfile = () => {  

>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
  const testCar: IProfileCarPreview = {
    likes: 293,
    watches: 4100,
    messages: 27,
    mainImageSrc:
      "https://i.wpimg.pl/1920x0/m.autokult.pl/audi-q5-5-02cd50a10925afcdcc53ca.jpg",
    place: "Kyiv",
    price: 67000,
    title: "Audi Q8 S Line",
  };
  return (
    <>
      <div className="my-cars">
        <CarPreview car={testCar}></CarPreview>
      </div>
    </>
  );
};

export default UserProfile;
