import { useState } from "react";
import { Button } from "antd";
// import { AddPostStep1, AddPostStep2 } from "./steps";
// import FooterSteps from "./steps/footer";

const AddPost = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stateButtonPreviousStep, setStateButtonPreviousStep] = useState<boolean>(false);
  const [stateButtonNextStep, setStateButtonNextStep] = useState<boolean>(false);

  const setNextPage = () => {
    if (currentStep == 2) {
      setStateButtonNextStep(true)
      setStateButtonPreviousStep(false)
    }
    else {
      setStateButtonNextStep(false)
      
    }
    setCurrentStep(currentStep + 1);
  };

  const setPrevPage = () => {
    if (currentStep == 1) {
      setStateButtonPreviousStep(true)
      setStateButtonNextStep(false)
    }
    else {
      setStateButtonPreviousStep(false)
      
    }
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Button disabled={stateButtonNextStep} onClick={setNextPage}>Next</Button>
      <Button disabled={stateButtonPreviousStep} onClick={setPrevPage}>Previous</Button>
      {/* <AddPostStep1 currentStep={currentStep} />
      <AddPostStep2 currentStep={currentStep} />
      <FooterSteps currentStep={currentStep}/> */}
    </>
  );
};

export default AddPost;

// id: 3
