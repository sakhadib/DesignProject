import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import SingleCon from "../components/singleContest";
import Footer from "../components/footer";



function IndividualCon() {
    return (
        <div>
            <Header />
            <SingleCon />
            <Footer/>
        </div>
    );
}

export default IndividualCon;