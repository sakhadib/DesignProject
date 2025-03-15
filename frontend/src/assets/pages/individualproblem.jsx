import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import ProblemView from "../components/individualproblem"; // Correct import
import SingleSub from "../components/usersingleSub"; // Correct import

function IndividualProblemDisplay() {
  const [isSplitViewOpen, setIsSplitViewOpen] = useState(false);

  const toggleSplitView = () => {
    setIsSplitViewOpen((prevState) => !prevState); // Toggle state
  };

  return (
    <div>
      <Header style={{ position: "fixed", top: 0, width: "100%", zIndex: 1100 }} />
      <ProblemView toggleSplitView={toggleSplitView} /> {/* Pass toggle function here */}

      {/* Split View Rendered Conditionally */}
      {isSplitViewOpen && (
        <div
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderLeft: "2px solid #ddd",
        }}
      >
          <div style={{ flex: 1, padding: "20px", backgroundColor: "#fff" }}>
            {/* Right Panel (Help / Chatbot) */}
            <Typography variant="h5">Help / Chatbot</Typography>
            {/* Your help content goes here */}
          </div>
        </div>
        
      )}

      <SingleSub /> {/* Render SingleSub component */}

<Footer style={{ position: "relative", marginTop: "auto" }} />

    </div>
  );
}

export default IndividualProblemDisplay;
