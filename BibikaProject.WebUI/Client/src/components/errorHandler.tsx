import * as React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

class ErrorHandler extends React.Component<{}, {}> {
  public test() {
    toast.success("ASDAS");
  }
  public render(): JSX.Element {
    return <div>{this.props.children}</div>;
  }
}
export default ErrorHandler;
