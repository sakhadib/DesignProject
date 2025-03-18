import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Login from "../components/signin";

function Signin() {
    return (
        <div>
            <Header />
            <Login />
        </div>
    );
}

export default Signin;