import { Outlet } from "react-router";
import MenuProfile from "./containers/menuProfile";

const UserProfile = () => {
  return(
    <>
      <MenuProfile/>  
      <Outlet></Outlet>
    </>
  )
};

export default UserProfile;
