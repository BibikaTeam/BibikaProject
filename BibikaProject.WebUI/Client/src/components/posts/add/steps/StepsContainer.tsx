import { FC, useState } from "react"
import { CurrentStep } from "../types";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

const StepsContainer: FC = () => {
    
    const [currentStep, setCurrentStep] = useState<CurrentStep>(CurrentStep.SecondStep);

    const onFirstStepFinish = (values: any) => {
        console.log(values);
        setCurrentStep(CurrentStep.SecondStep);
    }

    const onSecondStepFinish = (values: any) => {
        console.log(values);
        setCurrentStep(CurrentStep.ThirdStep);
    }

    const onSecondStepBack = () => {
        setCurrentStep(CurrentStep.FirstStep);
    }

    const onThirdStepFinish = (values: any) => {
        console.log(values);
    }

    const onThirdStepBack = () => {
        setCurrentStep(CurrentStep.SecondStep);
    }

    if (currentStep == CurrentStep.FirstStep)
    {
        return(
            <FirstStep onFinish={onFirstStepFinish}/>  
        );
    }
    else if (currentStep == CurrentStep.SecondStep)
    {
        return(
            <SecondStep onFinish={onSecondStepFinish} onBack={onSecondStepBack}/>  
        );
    }
    else if (currentStep == CurrentStep.ThirdStep)
    {
        return(
            <ThirdStep onFinish={onThirdStepFinish} onBack={onThirdStepBack}/>  
        );
    }

    return(<></>)
}

export default StepsContainer;