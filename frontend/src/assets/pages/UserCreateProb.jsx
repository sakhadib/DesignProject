import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import UserProb from "../components/usercreatedProb";
import Footer from "../components/footer";



function ProbUser() {
    return (
        <div>
            <Header />
                <UserProb />
            <Footer/>
        </div>
    );
}

export default ProbUser;