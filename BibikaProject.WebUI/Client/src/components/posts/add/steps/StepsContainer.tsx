import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { IRequestError } from "../../../adminPanel/types";
import { addImagesToPost, addPost, getCarIdByParams } from "../service";
import { AddPostModel, CurrentStep } from "../types";
import { useNavigate } from "react-router";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import ZeroStep from "./ZeroStep";

let addPostModel: AddPostModel = {
  carId: 0,
  description: "",
  location: "",
  color: "",
  mileage: 0,
  year: "",
  sellerId: "",
  price: 0,
  technicalCondition: "",
  wasInUse: true,
};

let images: number[] = [];

const StepsContainer: FC = () => {
  const userId = useTypedSelector((redux) => redux.login.user?.id);
  const navigator = useNavigate();
  const [isLoadingShow, setLoadingShow] = useState<boolean>(true);

  const [currentStep, setCurrentStep] = useState<CurrentStep>(
    CurrentStep.FirstStep
  );

  useEffect(() => {
    setInterval(() => {
      setLoadingShow(false);
    }, 3000);
  }, []);

  const onFirstStepFinish = (values: number[]) => {
    images = values;
    setCurrentStep(CurrentStep.SecondStep);
  };

  const onSecondStepFinish = (values: any) => {
    addPostModel.description = values.description;
    addPostModel.year = `${values.selectedYear}-07-12T17:03:18.227Z`;
    addPostModel.color = values.selectedColor;
    addPostModel.price = values.selectedPrice;
    addPostModel.technicalCondition = values.selectedTechnicalCondition;
    addPostModel.mileage = values.selectedMileage;
    addPostModel.wasInUse = values.selectedUsing;

    getCarIdByParams({
      generationId: values.selectedGeneration,
      carBodyId: values.selectedCarBody,
      gearBoxId: values.selectedGearBox,
      completeSetId: values.selectedCompleteSet,
      engineId: values.selectedEngine,
    }).then((id: any) => {
      addPostModel.carId = id;
    });

    setCurrentStep(CurrentStep.ThirdStep);
  };

  const onSecondStepBack = () => {
    setCurrentStep(CurrentStep.FirstStep);
  };

  const onThirdStepFinish = (values: any) => {
    addPostModel.location = values;
    addPostModel.sellerId = userId!;
    try {
      console.log("values: ", addPostModel);
      addPost(addPostModel).then((data) => {
        addImagesToPost({
          postId: data,
          imagesId: images,
        });
        toast.success("You post are successfully added");
        navigator(`/post/trend-adv-order?id=${data}`);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const onThirdStepBack = () => {
    setCurrentStep(CurrentStep.SecondStep);
  };

  if (isLoadingShow) {
    return <ZeroStep />;
  }

  switch (currentStep) {
    case CurrentStep.FirstStep:
      return <FirstStep onFinish={onFirstStepFinish} />;

    case CurrentStep.SecondStep:
      return (
        <SecondStep onFinish={onSecondStepFinish} onBack={onSecondStepBack} />
      );

    case CurrentStep.ThirdStep:
      return (
        <ThirdStep onFinish={onThirdStepFinish} onBack={onThirdStepBack} />
      );
  }
};

export default StepsContainer;
