import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import UserBlogAll from "../components/userAllBlog";
import Footer from "../components/footer";



function UserblogAll() {
    return (
        <div>
            <Header />
           <UserBlogAll />
            <Footer/>
        </div>
    );
}

export default UserblogAll;