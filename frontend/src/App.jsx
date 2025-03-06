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




function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;
