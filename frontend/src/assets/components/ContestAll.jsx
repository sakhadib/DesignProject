import React, { useState } from 'react';
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

// Sample data for tables
const upcomingContests = [
  {
    name: 'Spring Coding Challenge',
    dateTime: '2024-01-20 14:00',
    duration: '2 hours',
    timer: '2 days',
    status: 'Open'
  },
  // Add more contests as needed
];

const previousContests = [
  {
    name: 'Winter Code Sprint',
    dateTime: '2023-12-15 10:00',
    duration: '3 hours',
    timer: 'Completed',
    status: 'Closed'
  },
  // Add more contests as needed
];

export default function ContestPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
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
            <TableCell>Date & Time</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Timer</TableCell>
            <TableCell>Registration Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contests.map((contest, index) => (
            <TableRow key={index}>
              <TableCell>{contest.name}</TableCell>
              <TableCell>{contest.dateTime}</TableCell>
              <TableCell>{contest.duration}</TableCell>
              <TableCell>{contest.timer}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color={contest.status === 'Open' ? 'primary' : 'secondary'}
                  disabled={contest.status === 'Closed'}
                >
                  {contest.status}
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
          onChange={handleFilterChange}
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
          <ContestTable 
            contests={upcomingContests} 
            title="Upcoming Contests" 
          />
          <ContestTable 
            contests={previousContests} 
            title="Previous Contests" 
          />
        </Box>

        <Card sx={{ width: 300, height: 'fit-content' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Heads Up
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Next Contest
            </Typography>
            <Typography variant="h5" gutterBottom>
              Spring Coding Challenge
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Date and Time: 2024-01-20 14:00
            </Typography>
            <Typography variant="h4" sx={{ my: 2, textAlign: 'center' }}>
              48:00:00
            </Typography>
            <Button 
              variant="contained" 
              fullWidth
              color="primary"
            >
              Register
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

