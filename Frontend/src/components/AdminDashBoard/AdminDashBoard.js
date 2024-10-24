import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashBoard.css"; // Importing the CSS file for styles

// AdminDashBoard Component
const AdminDashBoard = () => {
  const [usersWithBankAccounts, setUsersWithBankAccounts] = useState([]); 
  const [filteredUsers, setFilteredUsers] = useState([]);  
  const [searchTerm, setSearchTerm] = useState("");  
  const [role, setRole] = useState("Admin");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);  
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://user-bank-info-management.vercel.app/api/admin/All");
        const { users, bankAccounts } = response.data;

        const combinedData = users.map(user => {
          const userBankAccounts = bankAccounts.filter(account => account.user._id === user._id & user.role!=="admin");
          return {
            ...user,
            bankAccounts: userBankAccounts 
          };
        });

        setUsersWithBankAccounts(combinedData);
        setFilteredUsers(combinedData);
      } catch (error) {
        console.error("There was an error retrieving the user data!", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = usersWithBankAccounts.filter(
      (user) =>
        user.username.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.bankAccounts.some(account =>
          account.bankName.toLowerCase().includes(value) ||
          account.accountNumber.toLowerCase().includes(value) ||
          account.ifscCode.toLowerCase().includes(value)
        )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin-dashboard colorful-background">
      <h1 className="admin-title">{role} Panel</h1>
      <h2 className="section-title">View User Bank Information</h2>

      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by name or bank details"
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* User Bank Information Table */}
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, userIndex) => (
                <React.Fragment key={user._id}>
                  <tr className="user-row">
                    <td>{indexOfFirstUser + userIndex + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                  </tr>

                  {/* Bank accounts under user */}
                  {user.bankAccounts.length > 0 ? (
                    <tr>
                      <td colSpan="4">
                        <table className="nested-table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Bank Name</th>
                              <th>Account Number</th>
                              <th>IFSC Code</th>
                              <th>Branch</th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.bankAccounts.map((bankAccount, bankIndex) => (
                              <tr key={`${user._id}-bank-${bankIndex}`}>
                                <td>{bankIndex + 1}</td>
                                <td>{bankAccount.bankName}</td>
                                <td>{bankAccount.accountNumber}</td>
                                <td>{bankAccount.ifscCode}</td>
                                <td>{bankAccount.branchName}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="4">No bank account information available</td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashBoard;
