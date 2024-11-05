import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './assets/pages/Signin';
import Signup from './assets/pages/Signup';
import BlogHome from './assets/pages/BlogHome';
import BlogWrite from './assets/pages/Blogwrite';
import BlogPostDisplay from './assets/pages/BlogDisplay'; 
import Home from './assets/pages/Home';
import AllProblems from './assets/pages/allProblem';
import Individualproblem from './assets/pages/individualproblem';


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
        <Route path="/home" element={<Home />} />
        <Route path="/allproblems" element={<AllProblems />} />
        <Route path="/individualproblem/:id" element={<Individualproblem />} />
      </Routes>
    </Router>
  );
}

export default App;
