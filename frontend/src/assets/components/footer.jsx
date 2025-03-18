import { Box, Container, Grid, Typography, Link, Divider, Stack, useTheme, useMediaQuery } from "@mui/material"
import { Email, Phone, LocationOn } from "@mui/icons-material"
import React from "react"
import Logo from "../../../../Logo/SVG/tp_mini.svg"

const Footer = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "White", // Bright blue color as shown in the image
        color: "#1976d2",
        pt: 6,
        pb: 3,
        mt: "auto",
        borderTop: "5px solid rgba(0, 0, 0, 0.12)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Logo Column */}
          <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <Box sx={{ mb: 2 }}>
              <img src={Logo} alt="Logo" width="200" height="200" />
            </Box>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
              MathXplorer
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, maxWidth: 900, color:"#8D256F", fontSize: "20px" }}>
              Exploring the universe of mathematics through interactive learning
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.2)" }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ mb: isMobile ? 1 : 0 }}>
            © {currentYear} MathXplorer. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", mt: isMobile ? 1 : 0 }}>
            <Link href="/privacy#" color="inherit" sx={{ mx: 1,fontWeight: "bold",  textDecoration: "none", color:"#8D256F",  "&:hover": { color: "#000000" } }}>
              Privacy Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
