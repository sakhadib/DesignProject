import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Individualproblem from "../components/individualproblem";


function individualproblemDispaly() {
    return (
        <div>
            <Header />
            <Individualproblem/>
        </div>
    );
}

export default individualproblemDispaly;