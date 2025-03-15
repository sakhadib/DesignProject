import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Landing from "../components/landing";
import HeroSection from "../components/hero-section";
import Stats from "../components/stats";
import NoticeSection from "../components/notice-section";
import TopUsers from "../components/topusers";

function Home() {
    return (
        <div>
            <Header />
            <main>
                
                <HeroSection />
                <Stats />
                <NoticeSection />
                <TopUsers />
                {/* <Landing /> */}

            </main>
            <Footer />
        </div>
    );
}

export default Home;