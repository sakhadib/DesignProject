"use client"

import { useState } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import ProblemView from "../components/individualproblem"
import SingleSub from "../components/usersingleSub"
import { Typography } from "@mui/material" // Add this import

function IndividualProblemDisplay() {
  const [isSplitViewOpen, setIsSplitViewOpen] = useState(false)

  const toggleSplitView = () => {
    setIsSplitViewOpen((prevState) => !prevState) // Toggle state
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Header style={{ position: "fixed", top: 0, width: "100%", zIndex: 1100 }} />
      <ProblemView toggleSplitView={toggleSplitView} /> {/* Pass toggle function here */}
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        {/* Left Side - SingleSub Table */}
        <div
          style={{
            flex: "0 0 60%",
            padding: "20px",
            backgroundColor: "#fff",
            alignItems: "start",
            marginLeft: "100px",
          }}
        >
          <SingleSub />
        </div>

        {/* Right Side - Conditional Split View */}
        {isSplitViewOpen && (
          <div
            style={{
              flex: "0 0 40%",
              padding: "20px",
              backgroundColor: "#f5f5f5",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "stretch",
              borderLeft: "2px solid #ddd",
              minHeight: "500px",
            }}
          >
            <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px" }}>
              <Typography variant="h5">Help / Chatbot</Typography>
              {/* Help content goes here */}
            </div>
          </div>
        )}
      </div>
      <Footer style={{ position: "relative", marginTop: "auto" }} />
    </div>
  )
}

export default IndividualProblemDisplay

