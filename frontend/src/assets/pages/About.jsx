import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import About from "../components/About";
import Footer from "../components/footer";

function About() {
    return (
        <div>
            <Header />
            <About/>
            <Footer/>
        </div>
    );
}

export default About;