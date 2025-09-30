import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handlePrivacyPolicyClick3 = () => {

    navigate("/Peepee");
  };
  const handlePrivacyPolicyClick2 = () => {

    navigate("/Terms");
  };
  const handlePrivacyPolicyClick1 = () => {

    navigate("/ContactUs");
  };

  return (
    <div>
      <footer className="page-footer">
        <div className="footer-list">
          <button className="list-item" onClick={handlePrivacyPolicyClick1}>
            CONTACT US
          </button>
          <button className="list-item" onClick={handlePrivacyPolicyClick2}>
            TERMS OF SERVICE
          </button>
          <button className="list-item" onClick={handlePrivacyPolicyClick3}>
            PRIVACY POLICY
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
