import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Wave from '../../components/Wave';

const NotFoundPage = () => {
  return (
      <Wave 
        nav = { 
        <Navbar>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </Navbar>
        }
        left = {
          <>
            <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link to="/">Go back to the homepage</Link>
          </>
        }
        right= {
          <img src='/404.svg' width="100%" height="700vh" alt="illustration" />
        }
      />
  );
};

export default NotFoundPage;