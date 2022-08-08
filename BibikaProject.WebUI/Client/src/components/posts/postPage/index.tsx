import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { number } from "yup";
import { getPostById } from "./service";
import { IPostModel } from "./types";


const PostPage = () => {
    const { id } = useParams<string>();

    const [post, setPost] = useState<IPostModel>();

    useEffect(() => {
      getPostById(+id!).then(data => setPost(data));
    }, [post])

  return (
    <div style={{margin: "50px"}}>
        id: {id}
        <br/>
        year: {post?.year}
        <br/>
        location: {post?.location}
        <br/>
        color: {post?.color}
        <br/>
        mileage: {post?.mileage}
        <br/>
        sellerName: {post?.sellerName}
        <br/>
        likes: {post?.likes}
        <br/>
        viewes: {post?.viewes}
        <br/>
        car: 
        <br/>
        &emsp;car.id: {post?.car.id}
          <br/>
        &emsp;car.engine: 
          <br/>
          &emsp;&emsp;car.engine.id: {post?.car.engine.id}
            <br/>
            &emsp;&emsp;car.engine.title: {post?.car.engine.title}
            <br/>
            &emsp;&emsp;car.engine.capacity: {post?.car.engine.capacity}
            <br/>
            &emsp;&emsp;car.engine.kwPower: {post?.car.engine.kWPower}
            <br/>
            &emsp;&emsp;car.engine.fuel: {post?.car.engine.fuel}
            <br/>
            &emsp;car.carBody.title: {post?.car.carBodyTitle}
          <br/>      
          &emsp;car.completeSet.title: {post?.car.completeSetTitle}
          <br/>
          &emsp;car.gearbox.title: {post?.car.gearBoxTitle}
          <br/>
          &emsp;car.title: {post?.car.title}
          <br/>
        price: {post?.price}
        <br/>
    </div>
  )
}

export default PostPage;
