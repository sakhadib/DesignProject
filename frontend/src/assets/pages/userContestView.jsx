import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Usercontest from "../components/userContestView";
import Footer from "../components/footer";



function UsercontestView() {
    return (
        <div>
            <Header />
            <Usercontest />
            <Footer/>
        </div>
    );
}

export default UsercontestView;