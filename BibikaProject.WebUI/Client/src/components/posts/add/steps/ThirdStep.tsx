import { Button } from "antd"
import { FC } from "react"

interface ThirdStepProps {
    onFinish: (values: any) => void;
    onBack: () => void;
}

const ThirdStep: FC<ThirdStepProps> = (props) => {
    return(     
        <div className="steps-container">
            <div className="steps-header">
                <div className="steps-title-container">
                    <div className="steps-title">
                        3. Your contacts
                    </div>
                    <div className="steps-description">
                        &emsp;
                        Enter the seller's contacts
                    </div>
                </div>         

                <div className="steps-actions">
                    <Button className="steps-action-button-back" onClick={() => { props.onBack() }}>
                        Back
                    </Button>
                    <Button className="steps-action-button-done" onClick={() => { props.onFinish("On Finish from ThirdStep") }}>
                        Done
                    </Button>
                </div>
            </div>

            <div className="steps-body">
                Third step body
            </div>

            <div className="steps-footer">
                <div className="steps-footer-block">
                    <svg width="28" height="28" viewBox="0 0 38 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 18.0717L16.6696 31.0425C17.6157 32.0111 19.2306 31.7794 19.8663 30.5839L34 4" stroke="#219CE1" stroke-opacity="0.6" stroke-width="5" stroke-linecap="square"/>
                    </svg>
                </div>
                <div className="steps-footer-block">
                    <svg width="28" height="28" viewBox="0 0 38 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 18.0717L16.6696 31.0425C17.6157 32.0111 19.2306 31.7794 19.8663 30.5839L34 4" stroke="#219CE1" stroke-opacity="0.6" stroke-width="5" stroke-linecap="square"/>
                    </svg>
                </div>
                <div className="steps-footer-block-active">
                    3. Specify contacts
                </div>
            </div>
        </div>
    )
}

export default ThirdStep;