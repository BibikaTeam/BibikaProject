import { Button } from "antd"
import { FC, useRef, useState } from "react"
import { Link } from "react-router-dom";


interface LastStepProps {
    onFinish: (values: number[]) => void;
}

const LastStep: FC< LastStepProps> = (props) => {
   

    const onUpdate = (value: number[]) => {
       
    }
   
    return(     
        
        <div className="laststep-body"><div>
        </div>
        <div className="laststep-text">
            <div className="logo"><div className="save" >
                </div></div>
                <div>Congratulations!</div>
                <span>Your ad will appear on the site soon</span>
               
                </div>
                <button  className="steps-button"> <Link to="/">Home</Link></button>
                
                </div>
                

    )
}

export default LastStep