import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Correctly import BrowserRouter

import axios from 'axios';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import AllLinks from './pages/AllLinks';
import PublicLinks from './pages/publicLink';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/all-links" element={<AllLinks />} />
        <Route path="/links/:uniqueLink" element={<PublicLinks />} />
      </Routes>
    </Router>
  );
}

export default App;