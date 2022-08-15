import { current } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { string } from "yup";
import { getImagesByPostId, getPostById } from "./service";
import BodyTag from "./tags/bodyTag";
import HeaderTag from "./tags/headerTag";
import { IPostModel } from "./types";

const PostPage = () => {
  const { id } = useParams<string>();

  const [post, setPost] = useState<IPostModel>();
  const [year, setYear] = useState<number>();
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!post) {
      getPostById(+id!).then((data) => {
        setPost(data);
        setYear(new Date(data?.year!).getFullYear());
      });
      getImagesByPostId(+id!).then((data) => {
        setImages(data!);
      });
    }
  }, [post]);

  const onGoBack = () => {
    navigate(-1);
  };

  const onImageNext = () => {
    if (currentImageIndex === images.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
      images.push();
    }
  };

  const onImagePrev = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(images.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    // <div style={{margin: "50px"}}>
    //     id: {id}
    //     <br/>
    //     year: {post?.year}
    //     <br/>
    //     location: {post?.location}
    //     <br/>
    //     color: {post?.color}
    //     <br/>
    //     mileage: {post?.mileage}
    //     <br/>
    //     sellerName: {post?.sellerName}
    //     <br/>
    //     likes: {post?.likes}
    //     <br/>
    //     viewes: {post?.viewes}
    //     <br/>
    //     car:
    //     <br/>
    //     &emsp;car.id: {post?.car.id}
    //       <br/>
    //     &emsp;car.engine:
    //       <br/>
    //       &emsp;&emsp;car.engine.id: {post?.car.engine.id}
    //         <br/>
    //         &emsp;&emsp;car.engine.title: {post?.car.engine.title}
    //         <br/>
    //         &emsp;&emsp;car.engine.capacity: {post?.car.engine.capacity}
    //         <br/>
    //         &emsp;&emsp;car.engine.kwPower: {post?.car.engine.kWPower}
    //         <br/>
    //         &emsp;&emsp;car.engine.fuel: {post?.car.engine.fuel}
    //         <br/>
    //         &emsp;car.carBody.title: {post?.car.carBodyTitle}
    //       <br/>
    //       &emsp;car.completeSet.title: {post?.car.completeSetTitle}
    //       <br/>
    //       &emsp;car.gearbox.title: {post?.car.gearBoxTitle}
    //       <br/>
    //       &emsp;car.title: {post?.car.title}
    //       <br/>
    //     price: {post?.price}
    //     <br/>
    // </div>

    <div className="post-page-container">
      <div className="post-page-go-back">
        <a onClick={onGoBack}>&lt; Назад</a>
      </div>

      <div className="post-page-images">
        <div className="post-page-current-image">
          <img
            src={`https://localhost:5001/images/${images[currentImageIndex]}.png`}
          />
          <svg
            onClick={onImagePrev}
            className="left-arrow"
            width="30"
            height="58"
            viewBox="0 0 30 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27 3L4.53554 25.4645C2.58291 27.4171 2.58291 30.5829 4.53553 32.5355L27 55"
              stroke="white"
              stroke-opacity="0.5"
              stroke-width="5"
              stroke-linecap="round"
            />
          </svg>
          <svg
            onClick={onImageNext}
            className="right-arrow"
            width="30"
            height="58"
            viewBox="0 0 30 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3L25.4645 25.4645C27.4171 27.4171 27.4171 30.5829 25.4645 32.5355L3 55"
              stroke="white"
              stroke-opacity="0.5"
              stroke-width="5"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div className="post-page-side-images">
          {images.map((data, index) => {
            if (index != currentImageIndex) {
              return (
                <div className="post-page-side-image">
                  <img
                    src={`https://localhost:5001/images/${data}_small.png`}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="post-page-user-block">
        <div className="post-page-user-avatar">
          <span>{post?.sellerName[0].toUpperCase()}</span>
        </div>
        <div className="post-page-user-info">
          <div className="user-name">{post?.sellerName}</div>
          <div className="user-rating">4.5</div>
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6055 2.3541C15.2042 0.511478 17.811 0.51148 18.4097 2.3541L20.8856 9.97417C21.1533 10.7982 21.9213 11.3561 22.7877 11.3561H30.7999C32.7374 11.3561 33.5429 13.8354 31.9755 14.9742L25.4935 19.6836C24.7925 20.1929 24.4992 21.0957 24.7669 21.9197L27.2428 29.5398C27.8415 31.3824 25.7326 32.9146 24.1652 31.7758L17.6831 27.0664C16.9822 26.5571 16.033 26.5571 15.332 27.0664L8.84998 31.7758C7.28255 32.9146 5.17359 31.3824 5.7723 29.5398L8.24821 21.9197C8.51596 21.0957 8.22264 20.1929 7.52167 19.6836L1.03965 14.9742C-0.527779 13.8354 0.277772 11.3561 2.21522 11.3561H10.2274C11.0939 11.3561 11.8618 10.7982 12.1295 9.97417L14.6055 2.3541Z"
              fill="#E06738"
            />
          </svg>
          <div className="user-location">{post?.location}</div>
        </div>
        <div className="post-page-user-buttons">
          <div className="button-message">Message</div>
          <div className="button-phone">
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.20834 1.96243L8.20836 1.96245L11.7981 6.57414C11.7982 6.57425 11.7983 6.57435 11.7984 6.57445C12.2672 7.17749 12.4329 7.96345 12.2473 8.70567L12.2473 8.70588L11.1533 13.0859L11.1532 13.0863C11.0549 13.4804 11.0602 13.8933 11.1686 14.2848C11.277 14.6763 11.4847 15.0331 11.7717 15.3207L11.7724 15.3213L16.6864 20.2353L16.6867 20.2357C16.9746 20.5232 17.332 20.7313 17.7242 20.8397C18.1161 20.9481 18.5294 20.9531 18.9239 20.8544C18.9241 20.8543 18.9244 20.8543 18.9246 20.8542L23.3019 19.7604L23.302 19.7603C23.6682 19.6688 24.0504 19.6617 24.4197 19.7395C24.7891 19.8174 25.1358 19.9782 25.4339 20.2098L30.0454 23.7975C31.2293 24.7185 31.3364 26.4665 30.2788 27.5226L30.2784 27.5231L28.2104 29.5911C26.9695 30.8319 25.1526 31.3424 23.4956 30.759L23.4954 30.7589C18.3594 28.9518 13.6961 26.0115 9.85158 22.1561L9.84956 22.1541C5.99453 18.3102 3.0543 13.6478 1.2469 8.51263C0.665135 6.85733 1.17572 5.03816 2.41658 3.79731L4.48405 1.72984C4.48407 1.72982 4.4841 1.72979 4.48412 1.72976C4.73379 1.4805 5.03357 1.28713 5.3636 1.16248C5.69368 1.03781 6.04647 0.984711 6.39862 1.0067C6.75077 1.0287 7.09422 1.12528 7.40621 1.29004C7.71821 1.45481 7.99163 1.684 8.20834 1.96243Z"
                stroke="#E06738"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="post-page-title">
        <div className="title">{post?.car.title}</div>
        <div className="price">
          {post?.price}$<span className="dot"> •</span>
          <span className="uan"> {post?.price! * 36.6}₴</span>
        </div>
      </div>

      <div className="post-page-description">{post?.description}</div>

      <div className="post-page-specs">
        <div className="specs-header">
          <HeaderTag name="Road accidents" value="no" />
          <HeaderTag name="In wanted" value="no" />
          <HeaderTag name="Number of owners" value="1" />
          <HeaderTag name="Customs cleared" value="yes" />
        </div>

        <div className="specs-body">
          <BodyTag text={`Color: ${post?.color}`} />
          <BodyTag text={`Carbody: ${post?.car.carBodyTitle}`} />
          <BodyTag text={`Mileage: ${post?.mileage}`} />
          <BodyTag text={`Year: ${year}`} />
          <BodyTag text={`Complete set: ${post?.car.completeSetTitle}`} />
          <BodyTag text={`Engine: ${post?.car.engine.title}`} />
          <BodyTag text={`Fuel: ${post?.car.engine.fuel}`} />
          <BodyTag text={`KW power: ${post?.car.engine.kwPower}`} />
          <BodyTag text={`Gearbox: ${post?.car.gearBoxTitle}`} />
          <BodyTag text={`Capacity: ${post?.car.engine.capacity}`} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
