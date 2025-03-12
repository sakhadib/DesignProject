import React from "react"
import { Box } from "@mui/material"
import Header from "../components/header"
import Profile from "../components/profile"
import Footer from "../components/footer"
import Graph from "../components/ratingGraph"
import HeatMap from "../components/heatmap"
import UserBlog from "../components/user-blog"
import UserSub from "../components/user-submission"

function UserPage() {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden", bgcolor: "background.default" }}>
      <Header />
        <Profile />
        <Graph />
        <HeatMap />
        <UserBlog />
        <UserSub />
      <Footer />
    </Box>
  )
}

export default UserPage
