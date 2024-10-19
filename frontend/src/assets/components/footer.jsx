import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

    const FooterLink = ({ href, children }) => (
    <Link href={href} color="inherit" sx={{ display: 'block', mb: 1 }}>
        {children}
    </Link>
    );

    export default function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
            <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
                <Box sx={{ mb: 2 }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0ZM25.7143 28.5714C23.8095 30.4762 20.9524 31.4286 18.0952 31.4286C15.2381 31.4286 12.381 30.4762 10.4762 28.5714C8.57143 26.6667 7.61905 23.8095 7.61905 21.9048C7.61905 20 8.57143 17.1429 10.4762 15.2381C12.381 13.3333 15.2381 11.4286 18.0952 11.4286C20.9524 11.4286 23.8095 13.3333 25.7143 15.2381C27.619 17.1429 29.5238 20 29.5238 21.9048C29.5238 23.8095 27.619 26.6667 25.7143 28.5714Z" fill="#6366F1"/>
                </svg>
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
                © 2024 Your Company, Inc. All rights reserved.
            </Typography>
            </Box>
        </Container>
        </Box>
    );
}