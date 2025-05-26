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

const ApplicationPage = () => {
  // Состояние для данных формы
  const [formData, setFormData] = useState({
    carModel: '',
    rentalPeriod: '',
    startDate: '',
    additionalRequests: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Список доступных автомобилей
  const carModels = [
    'Mercedes-Benz S-Class',
    'BMW 7 Series',
    'Audi A8',
    'Porsche Panamera',
    'Range Rover'
  ];

  // Обработчик изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Отправка данных на сервер
      await apiClient.post('/applications/', formData);

      // Перенаправление после успешной отправки
      navigate('/applications/success');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 4
      }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Car Rental Application
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: '100%', mt: 1 }}
        >
          {/* Выбор автомобиля */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="car-model-label">Car Model</InputLabel>
            <Select
              labelId="car-model-label"
              id="carModel"
              name="carModel"
              value={formData.carModel}
              label="Car Model"
              onChange={handleChange}
            >
              {carModels.map((model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          Период аренды
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="rental-period-label">Rental Period</InputLabel>
            <Select
              labelId="rental-period-label"
              id="rentalPeriod"
              name="rentalPeriod"
              value={formData.rentalPeriod}
              label="Rental Period"
              onChange={handleChange}
            >
              <MenuItem value="1 day">1 day</MenuItem>
              <MenuItem value="3 days">3 days</MenuItem>
              <MenuItem value="1 week">1 week</MenuItem>
              <MenuItem value="2 weeks">2 weeks</MenuItem>
              <MenuItem value="1 month">1 month</MenuItem>
            </Select>
          </FormControl>

          {/* Дата начала аренды */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="startDate"
            label="Start Date"
            name="startDate"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.startDate}
            onChange={handleChange}
          />




          {/* Кнопка отправки */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Application
          </Button>

          {/* Ссылка назад гл форм */}
          <Box sx={{ textAlign: 'center' }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate(-1)}
            >
              Back to previous page
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ApplicationPage;