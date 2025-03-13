import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import UserSubAll from "../components/userAllSubmission";
import Footer from "../components/footer";



function SuballUser() {
    return (
        <div>
            <Header />
              <UserSubAll />
            <Footer/>
        </div>
    );
}

export default SuballUser;