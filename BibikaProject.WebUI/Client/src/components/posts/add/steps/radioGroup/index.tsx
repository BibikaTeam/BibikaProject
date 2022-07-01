import { Button, Radio, RadioChangeEvent } from "antd";
import { FC, useState } from "react"
import { IBrandModel } from "../../../../adminPanel/types";

interface RadioGroupProps {
    data: IBrandModel[];
    countBeforeHide: number;
    title: string;
    onChange: (value: RadioChangeEvent) => void;
}

const RadioGroup: FC<RadioGroupProps> = (props) => {

    const [count, setCount]  = useState<number>(props.countBeforeHide);

    const [buttonText, setButtonText] = useState<string>("Other");
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const onOtherClick = () => {

        if (collapsed == true)
        {
            setCount(props.data.length);
            setButtonText("Collapse");
            setCollapsed(false);
        } else {
            setCount(props.countBeforeHide);
            setButtonText("Other");
            setCollapsed(true);
        }
    }

    if (props.countBeforeHide == 0 )
    {
        return(
            <div className="radiogroup-container">
                <div className="radiogroup-title">
                    {props.title}
                </div>
                <Radio.Group
                    onChange={props.onChange}>
                    {
                        props.data.map((value, index) => (
                            <Radio.Button 
                                className="radiogroup-button"
                                key={index} 
                                value={value}>
                                {value.title}
                            </Radio.Button>
                        ))
                    }
                </Radio.Group>          
            </div>
        )
    }

    return(
        <div className="radiogroup-container">
            <div className="radiogroup-title">
                {props.title}
            </div>
            <Radio.Group
                onChange={props.onChange}>
                {
                    props.data.slice(0, count).map((value, index) => (
                        <Radio.Button 
                            className="radiogroup-button"
                            key={index} 
                            value={value}>
                            {value.title}
                        </Radio.Button>
                    ))
                }

                <Button className="radiogroup-button"
                        onClick={onOtherClick}>
                    {buttonText}
                </Button>
            </Radio.Group>
            
        </div>
    )
}

export default RadioGroup