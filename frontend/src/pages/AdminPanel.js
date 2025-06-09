import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

const AdminPanelPage = () => {
    const [formData, setFormData] = useState({
    model: '',
    brand: '',
    year: '',
    price: '',
    is_sold: false
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox"? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const carData = {
        ...formData,
        year: parseInt(formData.year),
        price: parseFloat(formData.price),
      };

      // Отправка данных на сервеp
      await apiClient.post('/car_marketplace/', carData);

      // Перенаправление после успешной отправки
      navigate('/car_marketplace/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit createCar');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Add New Car
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            label="Year"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Is Sold"
            name="is_sold"
            type="checkbox"
            onChange={handleChange}
            checked={formData.is_sold}
            InputLabelProps={{ shrink: true }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Car
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link component="button" variant="body2" onClick={() => navigate(-1)}>
              Back to previous page
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );

};

export default AdminPanelPage;