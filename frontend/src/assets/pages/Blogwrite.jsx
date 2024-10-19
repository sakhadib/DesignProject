import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Write from "../components/blogwrite";

function BlogWrite() {
    return (
        <div>
            <Header />
            <Write />
        </div>
    );
}

export default BlogWrite;