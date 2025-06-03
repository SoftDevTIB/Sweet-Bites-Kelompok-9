import React from "react";
// import logo from "../assets/logo.png"; 
import logo from "../../assets/logo.png"; 
import './header.css';

const SimpleHeader = () => {
    return (
        <div className="container-fluid sticky simple-header">
            <div className="row justify-content-between align-items-center">
                <div className="col"></div>
                <img
                src={logo}
                alt="Sweet Bites Logo"
                className="logo position-absolute top-50 start-50 translate-middle"
                />
            </div>
        </div>
    );
};

export default SimpleHeader;