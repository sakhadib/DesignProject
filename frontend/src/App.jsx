import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './assets/pages/Signin';
import Signup from './assets/pages/Signup';
import BlogHome from './assets/pages/BlogHome';
import BlogWrite from './assets/pages/Blogwrite';
import BlogPostDisplay from './assets/pages/BlogDisplay'; 
import Home from './assets/pages/Home';
import AllProblems from './assets/pages/allProblem';
import Individualproblem from './assets/pages/IndividualProblem';
import ProtectedRoute from './assets/components/protectedroute';
import AddProblem from './assets/pages/addProblem';
import AboutPage from './assets/pages/about';
import PrivacyPolicy from  './assets/pages/privacy';
import AllContest from './assets/pages/AllContest';
import RegistrationContest from './assets/pages/contestReg';

import AnnouncementsPage from './assets/pages/AnnouncementPage';
import UserContestCreate from './assets/pages/userContestCreate';
import IndividualCon from './assets/pages/singleContest';
import ContestProblem from './assets/pages/contestProbView';
import Leaderboard from './assets/pages/leaderBoard';
import UserContestDetails from './assets/pages/userContestView';
import UserContestEdits from './assets/pages/userContestEdit';
import UserProfile from './assets/pages/profile';
import BlogallUser from './assets/pages/userAllBlog';
import UserSuball from './assets/pages/userAllSubmission';
import PrivateContest from './assets/pages/AllPrivateContests';
import UserCreatProb from './assets/pages/UserCreateProb';
import Blogedit from './assets/pages/BlogEdit';
import UserLeader from './assets/pages/UserLeaderBoard';


// Import at the top of your theme configuration file or app entry file
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Load the Poppins font in your public/index.html or similar

// Create a theme with Poppins as the primary font
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});






function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/all" element={<BlogHome />} />
        
        {/* Protect the /blog/write route */}
        <Route
          path="/blog/write"
          element={
            <ProtectedRoute>
              <BlogWrite />
            </ProtectedRoute>
          }
        />
        
        <Route path="/blog/:id" element={<BlogPostDisplay />} />
        <Route path="/home" element={<Home />} />
        <Route path="/problem/all" element={<AllProblems />} />
        <Route path="/problem/single/:id" element={<Individualproblem />} />
        <Route path="/problem/add" element={<AddProblem />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/contest/all" element={<AllContest />} />
        <Route path="/contest/registration/:id" element={<RegistrationContest />} />
        <Route path="/contest/single/:id" element={<IndividualCon />} />
        <Route path="/announcement/all" element={<AnnouncementsPage/>}/>
        <Route path="/contest/create" element={<UserContestCreate/>}/>

        <Route path="/contest/problem/:id" element={<ContestProblem/>}/>
        <Route path="/contests/private/:id" element={<UserContestDetails/>}/>
        <Route path="/contests/private/edit/:id" element={<UserContestEdits/>}/>

        <Route path="/contest/:contest_id/problem/:id" element={ <ContestProblem/>} />
        <Route path="/contest/:id/leaderboard" element={< Leaderboard />}/>
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/user/blog/all/:id" element={<BlogallUser />} />
        <Route path="/user/submission/all/:id" element={<UserSuball />} />
        <Route path="/problem/create/:id" element={<UserCreatProb />} />
        <Route path="/contest/private/all" element={<PrivateContest />} />
        <Route path="/user/leaderboard" element={<UserLeader />} />
        <Route path="/blog/edit/:id" element={<Blogedit />} />
      </Routes>
    </Router>
    </ThemeProvider>
    
  );
}

export default App;
