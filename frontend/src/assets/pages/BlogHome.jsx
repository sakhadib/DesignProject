import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Bloghome from "../components/bloghome";

function BlogHome() {
    return (
        <div>
            <Header />
            <Bloghome />
        </div>
    );
}

export default BlogHome;