import React, { useContext } from "react";
import "./Admin.css";
import { Data } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

//Component for Login 

function Admin() {
  const { state, setState, popUps, setPopUps } = useContext(Data);
  const navigate = useNavigate();
  
  //navigate to register page
  const navigateToRegisterPage = () => {
    navigate("/register");
  };

   //change view of password
  const changeViewOfPasswordField = () => {
    setState((i) => ({ ...i, viewPassword: !state.viewPassword }));
  };

  // submit the form
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = {
      email: state.emailId,
      password: state.password
    };
   
    await axios.post("https://user-bank-info-management.vercel.app/api/auth/login", formData)
      .then((response) => {
        if (response.status === 200 && response.data.user.role==="admin") {
      
          setPopUps((i) => ({ ...i, loading: true }));
          const p_token = response.data.token;
          Cookies.set("p_token", p_token, { expires: 30 });
          
          setState((i) => ({
            ...i,
            viewPassword: true,
            loginMessage: "Login Successful and wait for 2 secs",
            loginStatus: true
          }));
          
          setTimeout(() => {
            setState((i) => ({
              ...i,
              currentUserName:  response.data.user.username,
              currentUserEmail:response.data.user.email,
              currentUserId:response.data.user._id,
              currentUserRole:response.data.user.role,
              loginStatus: false,
              isAdminLogin: true,
              isUserLogin:false
            }));
            setPopUps((i) => ({ ...i, showToast: true, loading: false }));

            navigate("/AdminDashBoard", { replace: true });
          }, 3000);
        }else{
            setState((i) => ({
                ...i,
                loginMessage: "Admin Details are Wrong",
                loginStatus: true
              }));
        }
      })
      .catch((error) => {
        if(error.response.status===400){
          setState((i) => ({
            ...i,
            loginMessage: "No User Found",
            loginStatus: true
          }));
        }
        else if (error.response.status === 500) {
         
          setState((i) => ({
            ...i,
            loginMessage: "Network problem please try again",
            loginStatus: true
          }));
        }
      });
  };
 // change emailId
  const changeEmailID = (e) => {
    setState((i) => ({ ...i, emailId: e.target.value }));
  };

  // change password
  const changePassword = (e) => {
    setState((i) => ({ ...i, password: e.target.value }));
  };

  return (
    <div className="Login-page">
      <div className="Login-card">
        <h1 className="Login-heading">Admin Login</h1>
        <form className="LoginForm" onSubmit={onSubmitForm}>
          <label htmlFor="input1" className="Login-label-name">
            EMAIL
          </label>
          <input
            type="email"
            id="input1"
            placeholder="Enter a Email"
            className="Login-input"
            onChange={changeEmailID}
            value={state.emailId}
            required
          />

          <label htmlFor="input3" className="Login-label-name">
            PASSWORD
          </label>
          <input
            className="Login-input "
            type={state.viewPassword ? "password" : "text"}
            id="input3"
            placeholder="Enter a Password"
            onChange={changePassword}
            value={state.password}
            required
          />

          <div className="Login-checkbox-div">
            <input
              className="Login-checkbox"
              type="checkbox"
              id="input4"
              onClick={changeViewOfPasswordField}
            />
            <label htmlFor="input4" className="Login-label-name">
              Show Password
            </label>
          </div>
          {state.loginStatus && (
            <p className="Login-successful">{state.loginMessage}</p>
          )}
          <button type="submit" className="Login-button">
            Login
          </button>
        </form>
        

        {/* popup modal */}
        {popUps.loading ? (
          <Modal
            size="sm"
            show={popUps.loading}
            aria-labelledby="example-modal-sizes-title-sm"
            centered
            className="d-flex flex-row justify-content-center"
          >
            <Modal.Body className="d-flex">
              {" "}
              <strong className="">Please Wait...</strong>
              <Spinner animation="border" role="status" className="loader">
                <span className="visually-hidden"> </span>
              </Spinner>
            </Modal.Body>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Admin;
