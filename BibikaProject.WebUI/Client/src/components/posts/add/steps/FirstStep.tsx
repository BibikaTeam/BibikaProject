import { Button } from "antd"
import { FC, useState } from "react"
import ImageUploading, { ImageListType } from 'react-images-uploading';
import PhotoUploaderInterface from "./photoUploaderInterface";


interface FirstStepProps {
    onFinish: (values: any) => void;
}

const FirstStep: FC<FirstStepProps> = (props) => {
    const [images, setImages] = useState<ImageListType>([]);
    const maxNumber = 20;

    const onChange = (imageList: any, addUpdateIndex: any) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
      };

    return(     
        <div className="steps-container">
            <div className="steps-header">
                <div className="steps-title-container">
                    <div className="steps-title">
                        1. <b>Add photos</b> of your car
                    </div>
                    <div className="steps-description">
                        &emsp;
                        There must be at least 3 photos
                    </div>
                </div>         

                <div className="steps-actions">
                    <Button className="steps-action-button-back"
                            disabled={true}>
                        Back
                    </Button>
                    <Button className="steps-action-button-done" onClick={() => { props.onFinish("On Finish from FirstStep") }}>
                        Done
                    </Button>
                </div>
            </div>

            <div className="steps-body">
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url">
                    {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    dragProps,
                    }) => (
                        <PhotoUploaderInterface imageList={imageList}
                                                onImageRemove={onImageRemove}
                                                onImageRemoveAll={onImageRemoveAll}
                                                onImageUpdate={onImageUpdate}
                                                onImageUpload={onImageUpload}
                                                dragProps={dragProps}/>        
                    )}
                </ImageUploading>
            </div>

            <div className="steps-footer">
                <div className="steps-footer-block-active">
                    1. Add photos
                </div>
                <div className="steps-footer-block">
                    2. Provide information
                </div>
                <div className="steps-footer-block">
                    3. Specify contacts
                </div>
            </div>
        </div>
    )
}

export default FirstStep