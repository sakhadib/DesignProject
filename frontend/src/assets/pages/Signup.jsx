import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../components/signup";
import Header from "../components/header";

function Registration() {
    return (
        <div>
            <Header />
            <SignUp />
        </div>
    );
}

export default Registration;