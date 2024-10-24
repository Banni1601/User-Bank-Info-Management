import React, { useContext } from "react"; 
import "./RegisterPage.css";
import { Data } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const JWT_SECRET="150fa542596e34cee77531a144c2ddb4119129b9b0d2d7d161b6a24bceaec3bd88c090088135a98182312de023433080fa79f972c168242af961a2532bdcb3bb150fa542596e34cee77531a144c2ddb4119129b9b0d2d7d161b6a24bceaec3bd88c090088135a98182312de023433080fa79f972c168242af961a2532bdcb3bb";

//Component for RegisterPage
function RegisterPage() {
  const { state, setState, popUps, setPopUps } = useContext(Data);
  const navigate = useNavigate();

  //navigate to login Form
  const navigateToLoginPage = () => {
    navigate("/login");
  };

  // Reset input fields
  const resetInputFields = () => {
    setState((prevState) => ({
      ...prevState,
      username: "",
      email: "",
      password: "",
      registerStatus: false,
      registerMessage: "",
    }));
  };

  // Change view of password
  const changeViewOfPasswordField = () => {
    setState((prevState) => ({ ...prevState, viewPassword: !state.viewPassword }));
  };

  // Handle form submission
  const onSubmitForm = async (e) => {
    e.preventDefault();
    
    if (!(state.username && state.email && state.password)) {
      setState((prevState) => ({
        ...prevState,
        registerStatus: true,
        registerMessage: "Give Data for All Fields"
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        registerStatus: true,
        registerMessage: "Please wait"
      }));
      
      const formData = {
        username: state.username,
        email: state.email,
        password: state.password
      };
      
      try {
        const response = await axios.post("https://user-bank-info-management.vercel.app/api/auth/register", formData);
        if (response.status === 201) {
          setPopUps((prevState) => ({ ...prevState, loading: true }));
          const p_token = response.data.token;
          Cookies.set("p_token", p_token, { expires: 30 });
          setState((prevState) => ({
            ...prevState,
            currentUserToken: p_token,
            viewPassword: true,
            registerMessage: "Register Successful. Please wait for 2 secs",
            registerStatus: true,
          }));
          
          console.log(response.data.user);
          setTimeout(() => {
            setState((prevState) => ({
              ...prevState,
              currentUserName: response.data.user.username,
              currentUserEmail: response.data.user.email,
              currentUserId: response.data.user._id,
              currentUserRole: response.data.user.role,
              isUserLogin: true,
              isAdminLogin: false,
            }));
            setPopUps((prevState) => ({ ...prevState, showToast: true, loading: false }));
            resetInputFields(); // Clear fields after successful registration
            navigate("/", { replace: true });
          }, 3000);
        }
      } catch (error) {
        if (error.response.status === 400) {
          setState((prevState) => ({
            ...prevState,
            registerMessage: "Give All Details",
            registerStatus: true
          }));
        } else if (error.response.status === 500) {
          setState((prevState) => ({
            ...prevState,
            registerMessage: "Network problem please try again",
            registerStatus: true
          }));
        }
      }
    }
  };

  // Handle username change
  const changeUserName = (e) => {
    setState((prevState) => ({ ...prevState, username: e.target.value }));
  };

  // Handle email change
  const changeMailId = (e) => {
    setState((prevState) => ({ ...prevState, email: e.target.value }));
  };

  // Handle password change
  const changePassword = (e) => {
    setState((prevState) => ({ ...prevState, password: e.target.value }));
  };

  return (
    <div className="Register-page">
      {/* Register Card */}
      <div className="Register-card">
        <h1 className="Register-heading">Please Signup</h1>
        {/* SignUp Form */}
        <form className="RegisterForm" onSubmit={onSubmitForm}>
          {/* USER NAME field */}
          <label htmlFor="input1" className="label-name">User Name</label>
          <input
            type="text"
            id="input1"
            placeholder="Enter a Name"
            className="Register-input"
            value={state.username} // Control the input
            onChange={changeUserName}
            required
          />
          {state.userNameError && (
            <p className="error-message">Name must contain 3 letters</p>
          )}
          {/* USER EmailID field */}
          <label htmlFor="input2" className="label-name">Email Id</label>
          <input
            className="Register-input"
            type="mail"
            id="input2"
            placeholder="Enter a Email Address"
            value={state.email} // Control the input
            onChange={changeMailId}
            required
          />
          {state.mailIdError && (
            <p className="error-message">mailId must contain 10 letters</p>
          )}
          {/* Password field */}
          <label htmlFor="input3" className="label-name">PASSWORD</label>
          <input
            className="Register-input"
            type={state.viewPassword ? "text" : "password"} // Show password conditionally
            id="input3"
            placeholder="Enter a Password"
            value={state.password} // Control the input
            onChange={changePassword}
            required
          />
          {state.passwordError && (
            <p className="error-message">password must contain 8 letters</p>
          )}
          <div className="Register-checkbox-div">
            <input
              className="Register-checkbox"
              type="checkbox"
              id="input4"
              onClick={changeViewOfPasswordField}
            />
            <label htmlFor="input4" className="label-name">Show Password</label>
          </div>
          {state.registerStatus && (
            <p className="register-successful">{state.registerMessage}</p>
          )}
          <button type="submit" className="Register-page-register-button">Register</button>
        </form>
        <button
          onClick={navigateToLoginPage}
          className="Register-page-Login-button"
        >
          Login
        </button>
      </div>
      {/* PopUp for Successful Signup */}
      {popUps.loading ? (
        <Modal
          size="sm"
          show={popUps.loading}
          aria-labelledby="example-modal-sizes-title-sm"
          centered
          className="d-flex flex-row justify-content-center"
        >
          <Modal.Body className="d-flex">
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
  );
}

export default RegisterPage;
