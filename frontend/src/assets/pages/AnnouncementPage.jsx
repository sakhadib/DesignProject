import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import AnnouncementsPage from "../components/AnnouncementPage";
import Footer from "../components/footer";


function addProblem() {
    return (
        <div>
            <Header />
            <AnnouncementsPage/>
            <Footer />
        </div>
    );
}

export default addProblem;