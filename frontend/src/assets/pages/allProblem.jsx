import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import AllProblems from "../components/allProblem";
import Footer from "../components/footer";
import Unsolved from "../components/unsolvedlist";


function AllProblemsDisplay() {
    return (
        <div>
            <Header />
            <AllProblems/>
            <Unsolved/>
            <Footer />
        </div>
    );
}

export default AllProblemsDisplay;