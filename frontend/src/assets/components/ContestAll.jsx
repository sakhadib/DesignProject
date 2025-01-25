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
  ToggleButtonGroup
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

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

  // Fetch data from APIs
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const responses = await Promise.all([
          fetch('http://127.0.0.1:8000/api/contest/all/upcoming'),
          fetch('http://127.0.0.1:8000/api/contest/all/active'),
          fetch('http://127.0.0.1:8000/api/contest/all/ended'),
        ]);
        const [upcoming, active, ended] = await Promise.all(responses.map((res) => res.json()));

        setUpcomingContests(upcoming.contests);
        setActiveContests(active.contests);
        setPreviousContests(ended.contests);
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
        </Box>

        <Card sx={{ width: 300, height: 'fit-content' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Heads Up
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Next Contest
            </Typography>
            {upcomingContests[0] && (
              <>
                <Typography variant="h5" gutterBottom>
                  {upcomingContests[0].title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Date and Time: {upcomingContests[0].start_time}
                </Typography>
              </>
            )}
            <Typography variant="h4" sx={{ my: 2, textAlign: 'center' }}>
              {upcomingContests[0] ? '48:00:00' : 'N/A'}
            </Typography>
            <Button 
              variant="contained" 
              fullWidth
              color="primary"
              disabled={!upcomingContests[0]}
            >
              Register
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ContestPage;
