import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import AddProblem from "../components/addProblem";
import Footer from "../components/footer";


function addProblem() {
    return (
        <div>
            <Header />
            <AddProblem/>
            <Footer />
        </div>
    );
}

export default addProblem;