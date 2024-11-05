import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Write from "../components/blogwrite";
import Footer from "../components/footer";

function BlogWrite() {
    return (
        <div>
            <Header />
            <Write />
            <Footer/>
        </div>
    );
}

export default BlogWrite;