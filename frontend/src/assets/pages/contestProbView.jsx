import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import ConProblemView from "../components/contestProbView"; // Correct import


function   ContestProblemDisplay() {
    return(
        <div>
            <Header />
            <ConProblemView />
            <Footer />
        </div>
    )
}

export default ContestProblemDisplay;