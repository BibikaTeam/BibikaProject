import * as React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export interface IErrorForHandling {
  errorCode: string | number;
  errorString: string;
}

class ErrorHandler extends React.Component<{}, {}> {
  public errorHandling({ errorCode, errorString }: IErrorForHandling) {
    console.log("Error code: ", errorCode);
    console.log("Error string: ", errorString);
  }
  public render(): JSX.Element {
    return <>{this.props.children}</>;
  }
}
export default ErrorHandler;
