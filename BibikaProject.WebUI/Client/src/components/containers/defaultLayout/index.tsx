import { Outlet } from "react-router";
import ErrorHandler from "../../errorHandler";
import Footer from "./footer";
import Header from "./header";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet></Outlet>
      {/* <Footer /> */}
    </>
  );
};
export default DefaultLayout;
