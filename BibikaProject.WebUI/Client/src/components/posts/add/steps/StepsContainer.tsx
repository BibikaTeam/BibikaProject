import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { addImagesToPost, addPost, getCarIdByParams } from "../service";
import { AddPostModel, CurrentStep } from "../types";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

let addPostModel: AddPostModel = {
    carId: 0,
    description: "",
    location: "",
    color: "blue",
    mileage: 10,
    year: "",
    sellerId: "",
}

let images: number[] = [];

const StepsContainer: FC = () => {

    const userId = useTypedSelector((redux) => redux.login.user?.id);

    const [currentStep, setCurrentStep] = useState<CurrentStep>(CurrentStep.FirstStep);
    
    const onFirstStepFinish = (values: number[]) => {
        images = values;
        setCurrentStep(CurrentStep.SecondStep);
    }

    const onSecondStepFinish = (values: any) => {
        addPostModel.description = values.description;
        addPostModel.year = `${values.selectedYear}-07-12T17:03:18.227Z`;
        getCarIdByParams(
            {
                generationId: values.selectedGeneration,
                carBodyId: values.selectedCarBody,
                gearBoxId: values.selectedGearBox,
                completeSetId: values.selectedCompleteSet,
                engineId: values.selectedEngine,
            }

        ).then((id: any) => { addPostModel.carId = id; console.log(id); });

        console.log(values.selectedYear);
        

        setCurrentStep(CurrentStep.ThirdStep);
    }

    const onSecondStepBack = () => {
        setCurrentStep(CurrentStep.FirstStep);
    }

    const onThirdStepFinish = (values: any) => {
        addPostModel.location = values;
        addPostModel.sellerId = userId!;

        addPost(addPostModel).then(data => {
            addImagesToPost({
                postId: data,
                imagesId: images
            });
                console.log(data);
                
        });            
    }

    const onThirdStepBack = () => {
        setCurrentStep(CurrentStep.SecondStep);
    }

    switch (currentStep)
    {
        case CurrentStep.FirstStep: 
            return ( <FirstStep onFinish={onFirstStepFinish}/> );
        
        case CurrentStep.SecondStep:
            return( <SecondStep onFinish={onSecondStepFinish} onBack={onSecondStepBack}/> );

        case CurrentStep.ThirdStep:
            return( <ThirdStep onFinish={onThirdStepFinish} onBack={onThirdStepBack}/>  );
    }
}

export default StepsContainer;