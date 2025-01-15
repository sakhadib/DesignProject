import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import ProblemView from "../components/individualproblem"; // Correct import

function IndividualProblemDisplay() {
  const [isSplitViewOpen, setIsSplitViewOpen] = useState(false);

  const toggleSplitView = () => {
    setIsSplitViewOpen((prevState) => !prevState); // Toggle state
  };

  return (
    <div>
      <Header />
      <ProblemView toggleSplitView={toggleSplitView} /> {/* Pass toggle function here */}

      {/* Split View Rendered Conditionally */}
      {isSplitViewOpen && (
        <div style={{ display: "flex", height: "100vh" }}>
          <div style={{ flex: 1, padding: "20px", backgroundColor: "#f0f0f0" }}>
            {/* Left Panel (Problem Content) */}
            <Typography variant="h5">Problem Details</Typography>
            {/* Your problem details go here */}
          </div>
          <div style={{ flex: 1, padding: "20px", backgroundColor: "#fff" }}>
            {/* Right Panel (Help / Chatbot) */}
            <Typography variant="h5">Help / Chatbot</Typography>
            {/* Your help content goes here */}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default IndividualProblemDisplay;
