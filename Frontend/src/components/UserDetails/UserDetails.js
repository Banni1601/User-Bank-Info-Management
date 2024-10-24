import React, { useState } from "react";
import axios from "axios";
import styles from "./UserDetails.module.css"; // Import the CSS module

const UserDetails = ({ userName, userEmail, userRole, userId, bankAccounts, setBankAccounts }) => {
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [showUpdateAccountModal, setShowUpdateAccountModal] = useState(false);
  const [newAccount, setNewAccount] = useState({
    ifscCode: "",
    branchName: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });
  const [currentAccountId, setCurrentAccountId] = useState(null);

  const handleDelete = async (bankId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bank/${bankId}`);
      const response = await axios.get(
        `http://localhost:5000/api/bank/specificUserBankAccounts/${userId}`
      );
      setBankAccounts(response.data.reverse());
    } catch (error) {
      console.error("Error deleting bank account:", error);
    }
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/bank/addBankAccount/${userId}`,
        newAccount
      );
      const updatedAccounts = await axios.get(
        `http://localhost:5000/api/bank/specificUserBankAccounts/${userId}`
      );
      setBankAccounts(updatedAccounts.data.reverse());
      setShowAddAccountModal(false);
      resetNewAccount();
    } catch (error) {
      console.error("Error adding bank account:", error);
    }
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/bank/${currentAccountId}`, newAccount);
      const updatedAccounts = await axios.get(
        `http://localhost:5000/api/bank/specificUserBankAccounts/${userId}`
      );
      setBankAccounts(updatedAccounts.data.reverse());
      setShowUpdateAccountModal(false);
      resetNewAccount();
    } catch (error) {
      console.error("Error updating bank account:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    resetNewAccount();
    setShowAddAccountModal(false);
    setShowUpdateAccountModal(false);
  };

  const openUpdateModal = (account) => {
    setCurrentAccountId(account._id);
    setNewAccount({
      ifscCode: account.ifscCode,
      branchName: account.branchName,
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      accountHolderName: account.accountHolderName,
    });
    setShowUpdateAccountModal(true);
  };

  const resetNewAccount = () => {
    setNewAccount({
      ifscCode: "",
      branchName: "",
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
    });
  };

  return (
    <div className={styles["user-details"]}>
      <div className={styles["user-info"]}>
        <h2>User Details</h2>
        <p><strong>Name:</strong> {userName}</p>
        <p><strong>Email:</strong> {userEmail}</p>
        <p><strong>Role:</strong> {userRole}</p>
        <p><strong>Id:</strong> {userId}</p>
      </div>

      <div className={styles["bank-accounts"]}>
        <h3>Bank Accounts</h3>
        <button onClick={() => setShowAddAccountModal(true)}>Add Bank Account</button>

        <div className={styles["table-container"]}>
          <table className={styles["bank-table"]}>
            <thead>
              <tr>
                <th>SI.No</th>
                <th>Bank Name</th>
                <th>Account Number</th>
                <th>Branch</th>
                <th>IFSC Code</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {bankAccounts.map((account, index) => (
                <tr key={account._id}>
                  <td>{index + 1}</td>
                  <td>{account.bankName}</td>
                  <td>{account.accountNumber}</td>
                  <td>{account.branchName}</td>
                  <td>{account.ifscCode}</td>
                  <td>
                    <button onClick={() => openUpdateModal(account)}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(account._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddAccountModal && (
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <h3>Add Bank Account</h3>
              <form onSubmit={handleAddAccount}>
                <div>
                  <label>IFSC Code:</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={newAccount.ifscCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Branch Name:</label>
                  <input
                    type="text"
                    name="branchName"
                    value={newAccount.branchName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Bank Name:</label>
                  <input
                    type="text"
                    name="bankName"
                    value={newAccount.bankName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Account Number:</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={newAccount.accountNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Account Holder Name:</label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={newAccount.accountHolderName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit">Add Account</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {showUpdateAccountModal && (
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <h3>Update Bank Account</h3>
              <form onSubmit={handleUpdateAccount}>
                <div>
                  <label>IFSC Code:</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={newAccount.ifscCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Branch Name:</label>
                  <input
                    type="text"
                    name="branchName"
                    value={newAccount.branchName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Bank Name:</label>
                  <input
                    type="text"
                    name="bankName"
                    value={newAccount.bankName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Account Number:</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={newAccount.accountNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Account Holder Name:</label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={newAccount.accountHolderName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit">Update Account</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
