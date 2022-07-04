import { register } from "../../../serviceWorker";
import { Link } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import "./headers.css";



const DefaultHeader = () => {
  const {user, isAuth} = useTypedSelector((store) => store.login);



  return (
    <nav className="navbar navbar-expand-lg navbar-dark  container" >
      <div className="container" >
        
   
        <Link className="navbar-brand"  to="/">
          Bibika
        </Link>
        <button
          className="navbar-toggler"
        
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                New 
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Used 
              </Link>
            </li>
        </ul>
         {isAuth ? (
        <ul  className="navbar-nav px-3"   >
            <li className="nav-item text-nowrap">
                <Link className="nav-link" to="/">
                    {user?.email}
                </Link>
            </li>
            <li className="nav-item text-nowrap">
                {}
            </li>
        </ul> 
        ):( 
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
                <Link className="nav-link" to="/login">
                  Login  
                </Link>
            </li>
            <li className="nav-item text-nowrap">
                <Link className="nav-link" to="/register">
                  Registration
                </Link>
            </li>
            <li className="nav-item"  >
              <Link className="nav-link" to="/">
                Sale car
              </Link>
            </li>
        </ul>
         )} 

        </div>
      </div>
    </nav>
  );
};
export default DefaultHeader;

