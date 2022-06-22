import { Button, DatePicker, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { RadioChangeEvent } from "antd/lib/radio";
import { FC, useState } from "react"
import RadioGroup from "./radioGroup";

interface SecondStepProps {
    onFinish: (values: any) => void;
    onBack: () => void;
}

const SecondStep: FC<SecondStepProps> = (props) => {
    const [carBodies, setCarBodies] = useState<string[]>([ 
        "Sedan",
        "Coupe",
        "Sport car", 
        "Wagon",
        "Hatchback",
        "Minivan",
        "Pickup"
    ])
    
    const [brands, setBrands] = useState<string[]>([
        "BMW",
        "Audi",
        "Tesla", 
        "Porsche",
        "Toyota",
        "Volkswagen",
        "Ferrari",
        "Honda",
        "Subaru",
        "Nissan",
        "Mazda",
        "Pontiac",
        "Alfa Romero",
        "Volvo",
        "Mitsubishi",
        "MAN",
        "Scania",
        "Buick",
        "Ford",
        "Opel",
    ]);

    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectedCarBody, setSelectedCarBody] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    return(     
        <div className="steps-container">
            <div className="steps-body">
                <div className="steps-header">
                    <div className="steps-title-container">
                        <div className="steps-title">
                            2. Basic information
                        </div>
                        <div className="steps-description">
                            &emsp;
                            Describe your car
                        </div>
                    </div>         

                    <div className="steps-actions">
                        <Button className="steps-action-button-back" onClick={() => { props.onBack() }}>
                            Back
                        </Button>
                        <Button className="steps-action-button-done" onClick={() => { props.onFinish("On Finish from SecondStep") }}>
                            Done
                        </Button>
                    </div>
                </div>

                <div className="steps-radio-container">
                    <RadioGroup 

                                data={brands} 
                                title={"Brand"} 
                                countBeforeHide={16} 
                                onChange={(value: RadioChangeEvent) => {console.log(value);}}/>

                    <RadioGroup 
                                data={carBodies} 
                                title={"Car body"} 
                                countBeforeHide={0} 
                                onChange={(value: RadioChangeEvent) => {console.log(value);}}/>
                </div>    
                <div className="steps-secondstep-description">
                    <span className="steps-secondstep-description-title">
                        Car description
                    </span>
                    <TextArea
                        className="steps-textarea"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description"
                        autoSize={{ minRows: 17, maxRows: 17 }}
                    />
                </div>
                <div className="steps-selects-container">
                    <div className="steps-select">
                        Year of manufacture 
                        <DatePicker className="steps-datepicker" onChange={(value) => {console.log(value);} } picker="year" />
                    </div>
                    <div className="steps-select">
                        Model 
                        <Select>
                        </Select>
                    </div>
                    <div className="steps-select">
                        Generation 
                        <Select>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="steps-footer">
                <div className="steps-footer-block">
                    <svg width="28" height="28" viewBox="0 0 38 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 18.0717L16.6696 31.0425C17.6157 32.0111 19.2306 31.7794 19.8663 30.5839L34 4" stroke="#219CE1" stroke-opacity="0.6" stroke-width="5" stroke-linecap="square"/>
                    </svg>
                </div>
                <div className="steps-footer-block-active">
                    2. Provide information
                </div>
                <div className="steps-footer-block">
                    3. Specify contacts
                </div>
            </div>
        </div>
    )
}

export default SecondStep;