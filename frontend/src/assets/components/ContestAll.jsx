import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import axios from '../../api';

// Styled search field
const SearchField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
  },
});

const ContestPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [activeContests, setActiveContests] = useState([]);
  const [previousContests, setPreviousContests] = useState([]);
  const [privateContests, setPrivateContests] = useState([]);

  // Fetch data from APIs
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const [upcomingRes, activeRes, previousRes] = await Promise.all([
          axios.get('/contest/all/upcoming'),
          axios.get('/contest/all/active'),
          axios.get('/contest/all/ended'),
          
        ]);

        setUpcomingContests(upcomingRes.data.contests);
        setActiveContests(activeRes.data.contests);
        setPreviousContests(previousRes.data.contests);

        // Example of setting private contests (mock data or actual API)
        setPrivateContests(previousRes.data.contests.filter((contest) => contest.isPrivate));
      } catch (error) {
        console.error('Error fetching contest data:', error);
      }
    };

    fetchContests();
  }, []);

  // Filter contests by search query
  const filterContests = (contests) => {
    if (!searchQuery) return contests;
    return contests.filter((contest) =>
      contest.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const ContestTable = ({ contests, title }) => (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Contest Name</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterContests(contests).map((contest) => (
            <TableRow key={contest.id}>
              <TableCell>{contest.title}</TableCell>
              <TableCell>{contest.start_time}</TableCell>
              <TableCell>{contest.end_time}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color={contest.status === 'active' ? 'primary' : 'secondary'}
                  disabled={contest.status !== 'active'}
                >
                  {contest.status === 'active' ? 'Register' : 'Closed'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const calculateTimeLeft = (startTime) => {
    const difference = new Date(startTime) - new Date();
    if (difference <= 0) return '00:00:00';
    const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
          aria-label="contest filter"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="upcoming">Upcoming</ToggleButton>
          <ToggleButton value="previous">Previous</ToggleButton>
          <ToggleButton value="private">Private</ToggleButton>
        </ToggleButtonGroup>

        <SearchField
          placeholder="Search contests..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          {(filter === 'all' || filter === 'upcoming') && (
            <ContestTable contests={upcomingContests} title="Upcoming Contests" />
          )}
          {(filter === 'all' || filter === 'previous') && (
            <ContestTable contests={previousContests} title="Previous Contests" />
          )}
          {(filter === 'all' || filter === 'private') && (
            <ContestTable contests={privateContests} title="Private Contests" />
          )}
        </Box>

        {/* Heads Up for Upcoming Contest */}
        {upcomingContests[0] && (
          <Card sx={{ width: 300, height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Heads Up
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Next Contest
              </Typography>
              <Typography variant="h5" gutterBottom>
                {upcomingContests[0].title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Date and Time: {upcomingContests[0].start_time}
              </Typography>
              <Typography variant="h4" sx={{ my: 2, textAlign: 'center' }}>
                {calculateTimeLeft(upcomingContests[0].start_time)}
              </Typography>
              <Button variant="contained" fullWidth color="primary">
                Register
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Heads Up for Active Contest */}
        {activeContests[0] && (
          <Card sx={{ width: 300, height: 'fit-content', mt: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Contest
              </Typography>
              <Typography variant="h5" gutterBottom>
                {activeContests[0].title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                End Time: {activeContests[0].end_time}
              </Typography>
              <Typography variant="h4" sx={{ my: 2, textAlign: 'center' }}>
                Ongoing
              </Typography>
              <Button variant="contained" fullWidth color="secondary">
                Participate
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default ContestPage;
