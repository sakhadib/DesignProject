import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import LeaderBoard from "../components/allLeaderboard";
import Footer from "../components/footer";


function addProblem() {
    return (
        <div>
            <Header />
            <LeaderBoard/>
            <Footer />
        </div>
    );
}

export default addProblem;