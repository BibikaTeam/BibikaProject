import { FC, useState } from "react"
import ImageUploading, { ImageListType } from 'react-images-uploading';

interface PhotoUploaderInterfaceProps {
  imageList: ImageListType
  onImageUpload: () => void
  onImageRemoveAll: () => void
  onImageUpdate: (index: number) => void
  onImageRemove: (index: number) => void
  dragProps: {
    onDrop: (e: any) => void;
    onDragEnter: (e: any) => void;
    onDragLeave: (e: any) => void;
    onDragOver: (e: any) => void;
    onDragStart: (e: any) => void;
  }
}

const PhotoUploaderInterface: FC<PhotoUploaderInterfaceProps> = (props) => { 

  if(props.imageList.length == 0)
  {
    return(
      <div className="steps-drag-photo"
        onClick={props.onImageUpload}
        {...props.dragProps}>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.2725 34V19.7275H0V14.2352H14.2725V0H19.7648V14.2352H34V19.7275H19.7648V34H14.2725Z" fill="#219CE1"/>
        </svg>
        Choose or drop photo here
      </div>
    )
  }

  return(
    <div className="steps-images-container">
      {props.imageList.map((image, index) => (
        <div key={index} className="steps-image-container" 
                         onClick={() => props.onImageRemove(index)}>
          <img src={image['data_url']} className="steps-image"/>
          <svg className="steps-cross" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2725 34V19.7275H0V14.2352H14.2725V0H19.7648V14.2352H34V19.7275H19.7648V34H14.2725Z"/>
          </svg>
        </div>
      ))}
      <div className="steps-add-image"
      onClick={props.onImageUpload}
      {...props.dragProps}>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.2725 34V19.7275H0V14.2352H14.2725V0H19.7648V14.2352H34V19.7275H19.7648V34H14.2725Z" fill="#219CE1"/>
        </svg>
      </div>
    </div>
  )
}

export default PhotoUploaderInterface;