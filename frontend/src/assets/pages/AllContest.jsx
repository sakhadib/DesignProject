import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import AllContests from "../components/AllContest";
import Footer from "../components/footer";


function allContest() {
    return (
        <div>
            <Header />
            <AllContests/>
            <Footer />
        </div>
    );
}

export default allContest;