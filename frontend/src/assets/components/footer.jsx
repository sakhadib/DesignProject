import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from '../img/tp_mini@4x.png'; // Import the new logo image

const FooterLink = ({ href, children }) => (
<Link href={href} color="inherit" sx={{ display: 'block', mb: 1 }}>
    {children}
</Link>
);

export default function Footer() {
return (
    <Box component="footer" sx={{ bgcolor: '#FEF9F2', py: 6, mt: '10vh' }}> {/* Updated background color */}
    <Container maxWidth="lg">
        <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
            <img src={logo} alt="Logo" width="200" height="150" /> {/* Updated logo */}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Making the world a better place through constructing elegant hierarchies.
            </Typography>
            <Box>
            <IconButton aria-label="Facebook" color="inherit">
                <FacebookIcon />
                </IconButton>
                <IconButton aria-label="Instagram" color="inherit">
                    <InstagramIcon />
                </IconButton>
                <IconButton aria-label="Twitter" color="inherit">
                    <TwitterIcon />
                </IconButton>
                <IconButton aria-label="GitHub" color="inherit">
                    <GitHubIcon />
                </IconButton>
                <IconButton aria-label="YouTube" color="inherit">
                    <YouTubeIcon />
                </IconButton>
                </Box>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                Solutions
                </Typography>
                <FooterLink href="#">Marketing</FooterLink>
                <FooterLink href="#">Analytics</FooterLink>
                <FooterLink href="#">Commerce</FooterLink>
                <FooterLink href="#">Insights</FooterLink>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                Support
                </Typography>
                <FooterLink href="#">Pricing</FooterLink>
                <FooterLink href="#">Documentation</FooterLink>
                <FooterLink href="#">Guides</FooterLink>
                <FooterLink href="#">API Status</FooterLink>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                Company
                </Typography>
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Jobs</FooterLink>
                <FooterLink href="#">Press</FooterLink>
                <FooterLink href="#">Partners</FooterLink>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                Legal
                </Typography>
                <FooterLink href="#">Claim</FooterLink>
                <FooterLink href="#">Privacy</FooterLink>
                <FooterLink href="#">Terms</FooterLink>
            </Grid>
            </Grid>
            <Box mt={5}>
            <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Your Company, Inc. All rights reserved.
            </Typography>

            </Box>
        </Container>
        </Box>
    );
}
