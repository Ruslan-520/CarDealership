import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from '@mui/material';
import apiClient from '../api/client';
import { deepPurple } from '@mui/material/colors';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await apiClient.get('/auth/profile/');
        setUser(data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            bgcolor: deepPurple[500],
            fontSize: '2.5rem',
            mb: 2
          }}
        >
          {user?.email?.charAt(0).toUpperCase()}
        </Avatar>

        <Typography component="h1" variant="h4">
          {user?.email}
        </Typography>

        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Email" secondary={user?.email || 'Not provided'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Phone" secondary={user?.phone || 'Not provided'} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Registration Date"
              secondary={new Date(user?.date_joined).toLocaleDateString()}
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default ProfilePage;
