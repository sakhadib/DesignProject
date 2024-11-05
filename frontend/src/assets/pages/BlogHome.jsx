import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Bloghome from "../components/bloghome";
import Footer from "../components/footer";

function BlogHome() {
    return (
        <div>
            <Header />
            <main>
                <Bloghome />
            </main>
            <Footer />
        </div>
    );
}

export default BlogHome;