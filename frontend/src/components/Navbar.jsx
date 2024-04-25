import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png'
import { Link } from 'react-router-dom';
import { logout } from '../redux/authenticationSlice';
import { checkAdmin } from '../api-helper';
import './navbar.css'


const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
  const userId = useSelector(state => state.authentication.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();

    // Handle login logic here
    axios.post('http://127.0.0.1:5000/logout', {user_id: userId}, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(response => {
      // Handle success
      console.log('Successs Log out', response)
      dispatch(logout())
      navigate('/login')
    })
    .catch(error => {
      console.error('Error Logging Out:', error);
    });
  }

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (userId) {
        try {
          const isUserAdmin = await checkAdmin(userId);
          setIsAdmin(isUserAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      }
    };
  
    fetchAdminStatus();
  }, [userId])

  return (
    <header className="navbar">
      <div className="container">
        <div className="logo-container">
            <img src={logo} alt="Your Logo" className="logo" />
        </div>

        <nav className="nav-menu">
          <ul className="nav-list">
            {isLoggedIn && (
              <>
                <li><Link to="/upload" className="nav-link">Upload</Link></li>
                <li><Link to="/session" className="nav-link">Query</Link></li>
                <li><Link to="/userSession" className="nav-link">Workflows</Link></li>
                <li><a href="#" className="nav-link" onClick={handleLogout}>Logout</a></li>
                <li><Link to="/profile" className="nav-link">Profile</Link></li>
                {isAdmin && <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>}
              </>
            )}
            {!isLoggedIn && <li><Link to="/login" className="nav-link">Login</Link></li>}
          </ul>
        </nav>
      </div>
  </header>
  );
};

export default Navbar;
