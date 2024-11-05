import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import AllProblems from "../components/allProblem";
import Footer from "../components/footer";


function AllProblemsDisplay() {
    return (
        <div>
            <Header />
            <AllProblems/>
            <Footer />
        </div>
    );
}

export default AllProblemsDisplay;