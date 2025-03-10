import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Profile from "../components/profile";
import Footer from "../components/footer";
import Graph from "../components/ratingGraph";
import HeatMap from "../components/heatmap"


function UserPage() { // Rename this function to avoid conflicts
    return (
        <div>
            <Header />
            <Profile/>
            <Graph/>
            <HeatMap />
            <Footer />
        </div>
    );
}

export default UserPage;