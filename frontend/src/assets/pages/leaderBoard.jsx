import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import LeaderboardPage from "../components/leaderBoard";
import Footer from "../components/footer";

function Rating() { // Rename this function to avoid conflicts
    return (
        <div>
            <Header />
            <LeaderboardPage />  {/* Assuming this renders another About component */}
            <Footer />
        </div>
    );
}

export default Rating;