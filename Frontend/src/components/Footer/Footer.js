import React from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={contactInfoStyle}>
          <h3>3W Company</h3>
          <p style={contactItemStyle}>
            <FaPhone style={iconStyle} /> +919390016171
          </p>
          <p style={contactItemStyle}>
            <FaEnvelope style={iconStyle} /> bunnyv082@gmail.com
          </p>
          <p>Hyderabad, Telangana, India, 500055</p>
        </div>

        <div style={socialMediaStyle}>
          <a
            href="https://www.linkedin.com/in/bannibabu"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Banni1601"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div style={copyRightStyle}>
        <p>&copy; {new Date().getFullYear()} 3W Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "#282c34",
  color: "#fff",
  padding: "20px 0",
  textAlign: "center",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
};

const contactInfoStyle = {
  textAlign: "center",
  marginBottom: "10px",
};

const contactItemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  margin: "5px 0",
};

const iconStyle = {
  fontSize: "20px",
  color: "#00bfff",
};

const socialMediaStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "10px",
};

const copyRightStyle = {
  marginTop: "10px",
  fontSize: "14px",
  color: "#bbb",
};

export default Footer;
