import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import BlogDisp from "../components/blogdisplay";
import Footer from "../components/footer";

function Blogdisplay() {
    return (
        <div>
            <Header />
            <BlogDisp/>
            <Footer />
        </div>
    );
}

export default Blogdisplay;