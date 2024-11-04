import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './assets/pages/Signin';
import Signup from './assets/pages/Signup';
import BlogHome from './assets/pages/BlogHome';
import BlogWrite from './assets/pages/Blogwrite';
import BlogPostDisplay from './assets/pages/BlogDisplay'; 
import AllProblems from './assets/pages/allProblem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/bloghome" element={<BlogHome />} />
        <Route path="/blogwrite" element={<BlogWrite />} />
        <Route path="/blogpostdisplay" element={<BlogPostDisplay />} />
        <Route path="/allproblems" element={<AllProblems />} />

      </Routes>
    </Router>
  );
}

export default App;
