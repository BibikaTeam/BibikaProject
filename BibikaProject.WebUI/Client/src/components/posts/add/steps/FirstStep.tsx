import { Button } from "antd"
import { FC, useState } from "react"
import ImageSelector from "./imageSelector";


interface FirstStepProps {
    onFinish: (values: any) => void;
}

const FirstStep: FC<FirstStepProps> = (props) => {
    return(     
        <div className="steps-container">      
            <div className="steps-body">
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

               <ImageSelector />
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