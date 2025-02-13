import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/notice/all/');
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const data = await response.json();
        setAnnouncements(
          data.notices.map((notice) => ({
            id: notice.id,
            title: notice.title,
            content: notice.content,
            date: new Date(notice.created_at).toLocaleDateString(),
          }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          MathXplorer
        </Typography>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 4 }}
        >
          ANNOUNCEMENTS
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && announcements.length === 0 && (
        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', py: 4 }}>
          No announcements available.
        </Typography>
      )}

      {!loading &&
        !error &&
        announcements.map((announcement) => (
          <Accordion 
            key={announcement.id}
            sx={{
              mb: 1,
              '&:before': { display: 'none' },
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
              <Typography sx={{ flex: '1 1 auto', fontWeight: 500, pr: 2 }}>
                {announcement.title}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                {announcement.date}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                component="div"
                sx={{ whiteSpace: 'pre-wrap', color: 'text.secondary', lineHeight: 1.7 }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeMathjax]}
                >
                  {announcement.content}
                </ReactMarkdown>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </Container>
  );
}
