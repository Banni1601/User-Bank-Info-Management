import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserDetails from "../UserDetails/UserDetails";

import "./UserProfile.module.css";
import { Data } from "../../Context/userContext";

const UserProfile = () => {
  const { state } = useContext(Data);
  const [bankAccounts, setBankAccounts] = useState([]);

  const user = {
    userName: state.currentUserName,
    userEmail: state.currentUserEmail,
    userRole: state.currentUserRole,
    userId: state.currentUserId,
  };

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await axios.get(
          `https://user-bank-info-management.vercel.app/api/bank/specificUserBankAccounts/${user.userId}`
        );
        setBankAccounts(response.data.reverse());
      } catch (error) {
        console.error("Error fetching bank accounts:", error);
      }
    };

    if (user.userId) {
      fetchBankAccounts();
    }
  }, [user.userId]);

  return (
    <div className="App App2">
      <h1>User Profile</h1>
      <UserDetails
        userName={user.userName}
        userEmail={user.userEmail}
        userRole={user.userRole}
        userId={user.userId}
        bankAccounts={bankAccounts}
        setBankAccounts={setBankAccounts}
      />
    </div>
  );
};

export default UserProfile;
