import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Landing from "../components/landing";

function Home() {
    return (
        <div>
            <Header />
            <main>
                <Landing />
            </main>
            <Footer />
        </div>
    );
}

export default Home;