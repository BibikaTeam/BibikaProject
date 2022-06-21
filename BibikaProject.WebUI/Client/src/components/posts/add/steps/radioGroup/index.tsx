import { Radio } from "antd";
import { FC } from "react"

interface RadioGroupProps {
    data: string[];
    countBeforeHide: number;
    title: string;
    onChange: (value: string) => void;
}

const RadioGroup: FC<RadioGroupProps> = (props) => {

    console.log(props.data);
    

    return(
        <div className="radiogroup-container">
            <div className="radiogroup-title">
                {props.title}
            </div>
            <Radio.Group>
                {
                    props.data.map((value, index) => (
                        <Radio.Button 
                            className="radiogroup-button"
                            key={index} 
                            value={value}>
                            {value}
                        </Radio.Button>
                    ))
                }
            </Radio.Group>
        </div>
    )
}

export default RadioGroup