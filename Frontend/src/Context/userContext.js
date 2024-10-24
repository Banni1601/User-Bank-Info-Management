import React, { useState } from "react";

export const Data = React.createContext();

// Provider and Consumer the Data with Context
export const UserContext = ({ children }) => {
  const [state, setState] = useState({
    emailId: "sunny@gmail.com",
    password: "sunny",
    isAdminLogin:false,
    viewPassword: true,
    userNameError: false,
    mailIdError: false,
    passwordError: false,
    registerStatus: false,
    registerMessage:"",
    loginMessage:"",
    loginStatus: false,
    isUserLogin: false,
    currentUserName: "",
    currentUserEmail:"",
    currentUserId:"",
    currentUserRole:"",
    currentUserToken:"",
    allCustomerDetails:[]
      });
  const [popUps, setPopUps] = useState({ showToast: false, loading: false });
  return (
    <Data.Provider value={{ state, setState, popUps, setPopUps }}>
      {children}
    </Data.Provider>
  );
};

export default UserContext;
