import React, { useContext, useState } from "react";
import "./Header.css";
import { Data } from "../../Context/userContext";
import { Link } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";



//Component for Header
function Header() {
  const navigate = useNavigate();
  const { state, setState } = useContext(Data);
  const [show, setShow] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  
   // navigate to about page
  const navigateToAllusersData = () => {
    if (Cookies.get("p_token") === undefined) {
      setLoginModal(true);
      navigate("/login");
    } else {
      navigate("/AllusersData");
    }
  };

   // navigate to Client page
  const navigateToUpdate = () => {
    if (Cookies.get("p_token") === undefined) {
      setLoginModal(true);
      navigate("/login");
    } else {
      navigate("/ToUpdate");
    }
  };

   // navigate to Support page
  const navigateToDeleteAUser = () => {
    if (Cookies.get("p_token") === undefined) {
      setLoginModal(true);
      navigate("/login");
    } else {
      navigate("/deleteAUser");
    }
  };

   // log out and navigate to login page
  const logoutComponent = () => {
    if (state.isAdminLogin===true) {
      Cookies.remove("p_token");
      setState((i) => ({ ...i, isAdminLogin: false }));
      navigate("/", { replace: "/" });
      setShow(false);
    }else if (state.isUserLogin===true){
      Cookies.remove("p_token");
      setState((i) => ({ ...i, isUserLogin: false }));
      navigate("/", { replace: "/" });
      setShow(false);
    }
     else {
      setShow(false);
      navigate("/login");
    }
  };

   // navigate to Account page
  const navigateToProfile = ()=>{
    if (Cookies.get("p_token") === undefined) {
      setLoginModal(true);
      navigate("/login");
    } else {
      navigate("/userprofile");
    }
  }

   //  login And Logout page
  const loginAndLogout = () => {
    if (state.isUserLogin===true) {

      setShow(true);
    } else {
      setShow(false);
      navigate("/login");
    }
  };

     // Admin login And Logout page
     const AdminloginAndLogout = () => {
      if (state.isAdminLogin) {
        setShow(true);
      } else {
        setShow(false);
        navigate("/Admin");
      }
    };


  

  // sign in
  const clickSignup = () => {
    navigate("/register");
  };
  
  return (
    <div>
    {/* For Small Devices */}
      <div className="header-page-small-device fixed-top">
        <nav className="navbar navbar-dark bg-dark ">
          <div className="container-fluid">
            <Link to="" className="navbar-brand navbarName">
            3W Bank
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end text-bg-dark"
              tabIndex="-1"
              id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                  Menu
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
             
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
        
                  <li className="nav-item">
                    <Link to="/" className="nav-link " aria-current="page">
                      Home
                    </Link>
                  </li>

                  {
                    state.isUserLogin===true && 
                    <>
                     <li className="nav-item">
                    
                    <button className="nav-link" onClick={navigateToProfile}>
                     userprofile
                    </button>
                  </li>
                                     </>
                  }
                 


                  <li className="nav-item">

                    
          {
(state.isUserLogin===false && state.isAdminLogin===false) && 
  <>
  <button className="nav-link" onClick={loginAndLogout}>login</button> 
    <button onClick={clickSignup} className="nav-link">
     Sign Up
      </button>
      <button className="nav-link" onClick={AdminloginAndLogout} >Admin</button>       
  </>
}
         
{
(state.isUserLogin===true && state.isAdminLogin===false) && 
  <>
  <button
            className="nav-link"
            onClick={loginAndLogout}
          >
          Logout
          </button>
  </>
}

{
(state.isUserLogin===false && state.isAdminLogin===true) && 
  <>
  <button
            className="nav-link"
            onClick={AdminloginAndLogout}
          >
          Logout
          </button>
  </>
}
        


                  </li>
           
                </ul>
                  
                
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* For large Devices */}

      <div className="header-page-style fixed-top">
        <div className="header-page-website-name-style-div">
          <Link to="/" className="header-pages-features-style-para-style">
            <p className="header-page-website-name-style">3W Bank</p>
          </Link>
        </div>
        {
           (state.currentUserRole==="user" && state.isUserLogin===true)  && (
            <div className="header-pages-features-style">
          <Link to="/" className="header-pages-features-style-para-style">
            <p className="header-pages-para-styles">Home</p>
          </Link>
        <p onClick={navigateToProfile} className=" header-pages-para-styles">
        User Profile
          </p>
         
        </div>
          )
        }
        
        <div className="header-page-btns-tyle-div">




          {
(state.isUserLogin===false && state.isAdminLogin===false) && 
  <>
  <button className="header-page-btns-styles-div-styles" onClick={loginAndLogout}>login</button> 
    <button onClick={clickSignup} className="header-page-btns-styles-div-styles">
     <p>Sign Up</p>
      </button>
      <button className="header-page-btns-styles-div-styles" onClick={AdminloginAndLogout} >Admin</button>       
  </>
}
         
{
(state.isUserLogin===true && state.isAdminLogin===false) && 
  <>
  <button
            className="header-page-btns-styles-div-styles"
            onClick={loginAndLogout}
          >
          Logout
          </button>
  </>
}

{
(state.isUserLogin===false && state.isAdminLogin===true) && 
  <>
  <button
            className="header-page-btns-styles-div-styles"
            onClick={AdminloginAndLogout}
          >
          Logout
          </button>
  </>
}
        

          
        </div>
      </div>

      {/*popup modal for logout*/}
      <Modal
        size="sm"
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Body>Are You Sure, Want to Logout</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            No
          </Button>
          <Button variant="primary" onClick={logoutComponent}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/*popup modal for Instruct*/}
      <Modal
        size="md"
        show={loginModal}
        onHide={() => setLoginModal(!loginModal)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm" className="loginModal">
            Please Login or Signup for Access
          </Modal.Title>
        </Modal.Header>
     
      </Modal>
    </div>
  );
}

export default Header;
