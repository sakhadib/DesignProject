import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import BlogDisp from "../components/blogedit";
import Footer from "../components/footer";

function BlogdEdit() {
    return (
        <div>
            <Header />
            <BlogDisp/>
            <Footer />
        </div>
    );
}

export default BlogdEdit;