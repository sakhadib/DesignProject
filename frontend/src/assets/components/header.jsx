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
import api from '../../api'; // Import your configured axios instance

const NavLink = styled(Link)({
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user')); // Assume user info is saved as 'user' in localStorage
    setIsAuthenticated(!!token);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Function to handle sign-out
  const handleSignOut = () => {
    // Remove tokens and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    // Clear the authorization header from the axios instance
    delete api.defaults.headers.common['Authorization'];

    // Update state
    setIsAuthenticated(false);
    setUser(null);

    // Redirect to sign-in page
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
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <List>
        <ListItem component={Link} to="/home">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/problem/all">
          <ListItemText primary="Problems" />
        </ListItem>
        <ListItem component={Link} to="/contest">
          <ListItemText primary="Contest" />
        </ListItem>
        <ListItem component={Link} to="/blog">
          <ListItemText primary="Blogs" />
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
      color="transparent"
      sx={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'white',
        transition: 'background-color 0.3s ease',
        boxShadow: isScrolled ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <NavLink to="/">
            <svg
              className="text-purple-600"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 19C5.5 16.5 11 16.5 11 16.5C11 16.5 16.5 16.5 19 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M3 5C5.5 7.5 11 7.5 11 7.5C11 7.5 16.5 7.5 19 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </NavLink>

          <Box display={{ xs: 'none', md: 'flex' }} className="space-x-6">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/problem/all">Problems</NavLink>
            <NavLink to="/contest">Contest</NavLink>
            <NavLink to="/blog">Blogs</NavLink>
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
              <Avatar
                alt={user?.username}
                src={user?.profileImage || ''}
                sx={{ width: 32, height: 32, marginRight: 1 }}
              >
                {user?.username ? user.username[0].toUpperCase() : ''}
              </Avatar>
              <Typography variant="body1" sx={{ marginRight: 2 }}>{user?.username}</Typography>
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
          <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
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
