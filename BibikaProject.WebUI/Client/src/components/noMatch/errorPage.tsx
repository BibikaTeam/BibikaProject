import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import backgroundImg from "../../assets/errorPattern.png";
import { CodesDescriptionService } from "./errorsDescription";

const ErrorPage = () => {
  const { errorCode } = useParams<string>();
  const errorDescription =
    CodesDescriptionService.giveErrorDescription(errorCode);

  return (
    <div className="error-page">
      <h1>Error: #{errorCode}.</h1>
      <h2>{errorDescription} :(</h2>
      <Link to={"/"}>Go home page</Link>
      <img src={backgroundImg} alt="" />
    </div>
  );
};
export default ErrorPage;
