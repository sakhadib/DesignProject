import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import AllCon from "../components/ContestAll";
import Footer from "../components/footer";

function AllContest() {
    return (
        <div>
            <Header />
            <AllCon/>
            <Footer/>
        </div>
    );
}

export default AllContest;