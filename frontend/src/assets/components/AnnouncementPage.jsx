import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const announcements = [
  {
    id: 1,
    title: "ANNOUNCING THE TOP 41 TEAMS FOR THE INTER-UNIVERSITY PROJECT SHOW 2025!",
    date: "January 12, 2025",
    content: `🎉 Announcing the Top 41 Teams for the Inter-University Project Show 2025 🎉

As part of the highly anticipated UIU CSE FEST 2025, we are thrilled to unveil the Top 41 Teams advancing to the next phase of the Inter-University Project Show 2025!

After a meticulous review of numerous outstanding submissions, these 41 teams have risen to the top, demonstrating exceptional innovation and technical prowess. Congratulations to the selected teams—your hard work and creativity have earned you a well-deserved place in this prestigious competition!

To those who were not selected, we sincerely appreciate your efforts and encourage you to keep striving for excellence. Every step forward is a step closer to success, and more opportunities await to showcase your talents. Keep pushing the boundaries of innovation!

Important Notice for the Top 41 Teams:
📧 Please monitor your email inbox for detailed instructions and next steps.
🚀 Registration for the next phase is now open—don't miss out!

The countdown to January 18, 2025, is on! We're excited to see the groundbreaking ideas and projects these teams will bring to the spotlight.`
  },
  {
    id: 2,
    title: "UIU CSE FEST 2025: INTRA TABLE TENNIS TOURNAMENT FOR CSE DEPT STUDENTS & ALUMNI",
    date: "January 12, 2025",
    content: "🏓 Details about the table tennis tournament...",
  },
  {
    id: 3,
    title: "UIU CSE FEST 2025: INTRA BADMINTON TOURNAMENT FOR CSE DEPT STUDENTS & ALUMNI",
    date: "January 12, 2025",
    content: "🏸 Details about the badminton tournament...",
  },
  {
    id: 4,
    title: "PAYMENT PROCEDURE AND DEADLINE FOR UIU IUPC 2025 SHORTLISTED TEAMS",
    date: "January 12, 2025",
    content: "🎉 Payment procedure and deadline details...",
  },
  {
    id: 5,
    title: "Check the Demo track & Gear Up for the Ultimate LFR Showdown!",
    date: "January 12, 2025",
    content: "Details about the LFR showdown...",
  },
  {
    id: 6,
    title: "UIU IUPC 2025 - SHORTLISTED TEAMS ANNOUNCEMENT",
    date: "January 11, 2025",
    content: "Shortlisted teams announcement details...",
  },
  {
    id: 7,
    title: "SLOT DISTRIBUTION FOR UIU IUPC 2025",
    date: "January 10, 2025",
    content: "Slot distribution details...",
  },
  {
    id: 8,
    title: "UIU CSE FEST 2025 - SCAVENGER HUNT ANNOUNCEMENT 🏃✨⚡",
    date: "January 10, 2025",
    content: "Scavenger hunt announcement details...",
  }
];

export default function AnnouncementsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          UIU CSE FEST 2025
        </Typography>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 900,
            textTransform: 'uppercase',
            mb: 4 
          }}
        >
          ANNOUNCEMENTS
        </Typography>
      </Box>

      {announcements.map((announcement) => (
        <Accordion 
          key={announcement.id}
          sx={{
            mb: 1,
            '&:before': {
              display: 'none',
            },
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
            '&:first-of-type': {
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
            },
            '&:last-of-type': {
              borderBottomLeftRadius: '4px',
              borderBottomRightRadius: '4px',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              '& .MuiAccordionSummary-content': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
              },
            }}
          >
            <Typography 
              sx={{ 
                flex: '1 1 auto',
                fontWeight: 500,
                pr: 2
              }}
            >
              {announcement.title}
            </Typography>
            <Typography 
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.875rem'
              }}
            >
              {announcement.date}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                whiteSpace: 'pre-wrap',
                color: 'text.secondary',
                lineHeight: 1.7
              }}
            >
              {announcement.content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}