import { Button } from "antd"
import { FC, useRef, useState } from "react"
import ImageSelector from "./imageSelector";


interface FirstStepProps {
    onFinish: (values: number[]) => void;
}

const FirstStep: FC<FirstStepProps> = (props) => {
    const [images, setImages] = useState<number[]>([]);

    const onUpdate = (value: number[]) => {
        setImages(value);
    }

    const doneDisabledCheck = () => {
        if (images.length >= 0) {
            return false;
        }
        else {
            return true;
        }
    }

    return(     
        <div className="steps-container">      
        <div className="steps-body">
                <div className="steps-header">
                    <div className="steps-title-container">
                        <div className="steps-title">
                            1. <b>Add photos</b> of your car
                            
                        </div>
                       
                    <div className="steps-container">
                        <div className="steps-text">
                            &emsp;
                            There must be at least 3 photos</div>
                        </div>
                    </div>         

                    <div className="steps-actions">
                        <Button className="steps-action-button-back"
                                disabled={true}>
                            Back
                        </Button>
                        <Button className="steps-action-button-done" onClick={() => { props.onFinish(images); }}
                                disabled={doneDisabledCheck()}>
                            Next
                        </Button>
                    </div>
                </div><div></div>

               <ImageSelector onUpdate={onUpdate} />
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