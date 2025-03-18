import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import ConProblemView from "../components/contestProbView"; 
import SubTable from "../components/usersingleSub";


function   ContestProblemDisplay() {
    return(
        <div>
            <Header />
            <ConProblemView />
            <div
                           style={{
                             flex: "0 0 60%",
                             padding: "20px",
                             backgroundColor: "#fff",
                             alignItems: "start",
                             marginRight: "300px",
                             fontFamily: "'Poppins', sans-serif",
                             fontSize: "16px",
                           }}
                         >
                           <SubTable />
                         </div>
            <Footer />
        </div>
    )
}

export default ContestProblemDisplay;