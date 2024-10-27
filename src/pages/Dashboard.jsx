import React from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import Link here

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
      <p>
        Need to log in again? <Link to="/login">Login</Link>
      </p>
      <p> 
        Need to create an account? <Link to="/Signup">Signup</Link>
      </p>
    </div>
  );
};

export default Dashboard;
