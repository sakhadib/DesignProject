import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from 'axios'; // Import axios
import api from '../../api'; // Import your configured axios instance
import logo from '../img/tp_mini@4x.png'; // Import the new logo image

const NavLink = styled(Link)( {
  fontFamily: "'Poppins', sans-serif",
  textDecoration: 'none',
  color: '#333',
  fontWeight: '500',
  margin: '0 12px',
  '&:hover': {
    color: '#673ab7',
  },
});

function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user data from the /api/auth/me endpoint after checking token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      axios.post('http://127.0.0.1:8000/api/auth/me/', {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setUser(response.data); // Set user data from response
        })
        .catch(error => {
          console.error('Error fetching user data', error);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
    navigate('/signin');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 , fontFamily: "'Poppins', sans-serif" }}>
      <List>
        <ListItem component={Link} to="/home">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/problem/all">
          <ListItemText primary="Problems" />
        </ListItem>
        <ListItem component={Link} to="/contest/all">
          <ListItemText primary="Contest" />
        </ListItem>
        <ListItem component={Link} to="/contest/private/all">
          <ListItemText primary="Private Contest" />
        </ListItem>
        <ListItem component={Link} to="/blog/all">
          <ListItemText primary="Blogs" />
        </ListItem>
        <ListItem component={Link} to="/announcement/all">
          <ListItemText primary="Announcements" />
        </ListItem>
        <ListItem component={Link} to="/about">
          <ListItemText primary="About" />
        </ListItem>

        <Box sx={{ my: 2 }} />

        {!isAuthenticated ? (
          <>
            <ListItem component="div">
              <Button color="primary" variant="text" fullWidth component={Link} to="/signin">
                Sign in
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button variant="contained" color="primary" fullWidth component={Link} to="/signup">
                Sign up
              </Button>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem component="div">
              <Button variant="contained" color="primary" fullWidth onClick={handleSignOut}>
                Sign out
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: isScrolled ? '#ffffff' : '#ffffff',
        transition: 'background-color 0.3s ease',
        boxShadow: isScrolled ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <NavLink to="/">
            <img src={logo} alt="Logo" width="50" height="50" /> {/* Updated logo */}
          </NavLink>

          <Box display={{ xs: 'none', md: 'flex' }} className="space-x-6">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/problem/all">Problems</NavLink>
            <NavLink to="/contest/all">Contest</NavLink>
            <NavLink to="/contest/private/all">Private Contest</NavLink>
            <NavLink to="/blog/all">Blogs</NavLink>
            <NavLink to="/announcement/all">Announcements</NavLink>
            <NavLink to="/about">About</NavLink>
          </Box>
        </Box>

        <Box display={{ xs: 'none', md: 'flex' }} alignItems="center">
          {!isAuthenticated ? (
            <>
              <Button color="primary" variant="text" className="text-sm font-medium" component={Link} to="/signin">
                Sign in
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="text-sm font-medium"
                style={{ marginLeft: '8px' }}
                component={Link} to="/signup"
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center' , mr: 2, textDecoration: "none"}} component={Link} to={`/profile/${user?.id}`}>
              <Avatar
                alt={user?.username}
                sx={{
                  width: 32,
                  height: 32,
                  marginRight: 1,
                  fontSize: '16px', // Adjust font size for letter in Avatar
                  backgroundColor: '#1565C0', // Set a background color for the Avatar
                  
                }}
                
              >
                {user?.username ? user.username[0].toUpperCase() : ''}
              </Avatar>

              
              </Box>

              <Button
                variant="contained"
                color="primary"
                className="text-sm font-medium"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </>
          )}
        </Box>

        <Box display={{ xs: 'flex', md: 'none' }}>
          <IconButton color="#1E2761" edge="end" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
