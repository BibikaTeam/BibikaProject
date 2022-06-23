import { useState } from "react";
import { Button } from "antd";

import { loadImage, addImagesToPost, getModelsByBrandId } from "./service";

const AddPostPage = () => {
  const models = getModelsByBrandId(1);
  console.log("models by brand index", models);
  
  return (
    <>
    </>
  );
};

export default AddPostPage;
