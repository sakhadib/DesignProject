import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import AllProblems from "../components/allProblem";


function AllProblemsDisplay() {
    return (
        <div>
            <Header />
            <AllProblems/>

        </div>
    );
}

export default AllProblemsDisplay;