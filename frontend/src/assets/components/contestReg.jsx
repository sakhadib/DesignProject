import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  Button,
  Container
} from '@mui/material';

const ContestRegistration = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);

  const termsText = `The registration confirms that you:

* Eligibility:
    -Open to all registered MathXplorer users with accurate account details.
*Fair Play:
    -Cheating, sharing solutions, or using unauthorized aids is prohibited.
*Contest Structure:
    -Solve problems within the contest duration.
    -Follow the specified submission format; incorrect formats may be disqualified.
    -Points are based on correctness and difficulty, with ties broken by submission time.
    
*Code of Conduct:
    -Maintain respectful communication.
    -Do not share solutions or attempt to exploit the system.
    
*Disqualification:
    -Plagiarism, multiple accounts, or rule violations may lead to disqualification.
    -Appeals must be submitted within 48 hours of disqualification.
    
*Prizes and Recognition:
    -Only rule-compliant participants are eligible for prizes and leaderboard rankings.
    
*Technical Guidelines:
    -Ensure stable internet connectivity.
    -Report any technical issues promptly; contests may be paused if necessary.
    
*Final Decision:
    -Administrators’ decisions are final. Rules may be updated before contests.
`;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic here
    console.log('Registration submitted');
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registration for the contest
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom>
          Contest Name 
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Terms of agreement:
          </Typography>
          <TextField
            multiline
            fullWidth
            rows={10}
            value={termsText}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiInputBase-input': {
                fontFamily: 'monospace',
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <FormControl required error={false}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={acceptTerms} 
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
              }
              label="I accept"
            />
          </FormControl>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!acceptTerms}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default ContestRegistration;
