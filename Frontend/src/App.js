import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./Context/userContext";
import Header from "./components/Header/Header";
import Footer from ".//components/Footer/Footer";
import Home from "./components/Home/Home";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Login from "./components/Login/Login";


import About from "./components/About/About";
import DeleteUser from "./components/DeleteUser/DeleteUser";

import Account from "./components/Account/Account";
import UpdateCustomer from "./components/Client/UpdateCustomer";
import Admin from "./components/Admin/Admin";

import AdminDashBoard from "./components/AdminDashBoard/AdminDashBoard";
import UserProfile from "./components/UserProfile/UserProfile";

//Added the Router

function App() {
  return (
    <UserContext>

     
      
        <Routes to="/">
       
          <Route path="" element={(<div><Header /><Home /><Footer /></div>)} />
          <Route path="/ToUpdate" element={(<div><Header /><UpdateCustomer /><Footer /></div>)} />
          <Route path="/profile" element={ (<div><Header /><Account /><Footer /></div>)} />
          <Route path="/AllusersData" element={  (<div><Header /><About /><Footer /></div>)} />
          <Route path="/deleteAUser" element={ (<div> <Header /><DeleteUser /><Footer /></div>)} />


          <Route path="/userprofile" element={ (<div> <Header /><UserProfile /><Footer /></div>)} />
          <Route path="/AdminDashBoard" element={ (<div> <Header /><AdminDashBoard /><Footer /></div>)} />
          <Route path="/login" element={<Login />} />
          <Route path="/Admin" element={<Admin />} />
        <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          
        </Routes>
       
       
          
      

      
    </UserContext>
  );
}

export default App;
