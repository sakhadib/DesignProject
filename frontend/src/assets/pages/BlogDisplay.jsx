import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import BlogDisp from "../components/blogdisplay";
import CommentBox from "../components/comment"; 

function Blogdisplay() {
    return (
        <div>
            <Header />
            <BlogDisp/>
            {/* <CommentBox/> */}
        </div>
    );
}

export default Blogdisplay;