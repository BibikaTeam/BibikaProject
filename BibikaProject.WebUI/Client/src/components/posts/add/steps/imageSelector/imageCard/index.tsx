import { FC } from "react";

interface ImageCardProps {
  src: string;
  id: number;
  onClick: (id: number) => void;
}

const ImageCard: FC<ImageCardProps> = (props) => {
  const handleOnClick = () => {
    props.onClick(props.id);
  };

  console.log("src: ", props.src);

  return (
    <div className="imageSelector-card-container" onClick={handleOnClick}>
      <img className="imageCard-img" src={props.src} />
    </div>
  );
};

export default ImageCard;
