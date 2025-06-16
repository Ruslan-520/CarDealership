import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

const ApplicationPage = () => {
  const [formData, setFormData] = useState({
    id: '', // Установите начальное значение в пустую строку
    model: '',
    brand: '',
    price: 0,
    description: '',
    is_sold: false
  });

  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await apiClient.get('/car_marketplace/cars/');
        setCars(response.data);
      } catch (err) {
        console.error('Ошибка при выборке автомобилей:', err);
      }
    };
    fetchCars();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/applications/', formData);
      navigate('/car_marketplace/cars/');
    } catch (err) {
      setError(err.response?.data?.message || 'Не удалось подать заявку');
      console.error('Ошибка отправки:', err.response);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Car Purchase Application
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="car-label">Car</InputLabel>
            <Select
              labelId="car-label"
              id="car"
              name="id"
              value={formData.id}
              label="Car"
              onChange={handleChange}
            >
              {cars.map((car) => (
                <MenuItem key={car.id} value={car.id}>
                  {car.brand} {car.model} (${car.price})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {formData.id && (
            <Paper elevation={2} sx={{ padding: 2, marginTop: 2 }}>
              <Typography variant="subtitle1">Selected Car Details:</Typography>
              {cars
                .filter((car) => car.id == formData.id)
                .map((car) => (
                  <Box key={car.id}>
                    <Typography>Brand: {car.brand}</Typography>
                    <Typography>Model: {car.model}</Typography>
                    <Typography>Price: ${car.price}</Typography>
                    <Typography>Description: {car.description}</Typography>
                    <Typography>
                      Status: {car.is_sold ? 'Продано' : 'Доступно'}
                    </Typography>
                  </Box>
                ))}
            </Paper>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Application
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ApplicationPage;
