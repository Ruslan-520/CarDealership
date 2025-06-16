import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    general: '',
    fields: {}
  });

  const [openErrors, setOpenErrors] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Очищаем ошибку для поля при изменении
    if (errors.fields[e.target.name]) {
      setErrors({
        ...errors,
        fields: {
          ...errors.fields,
          [e.target.name]: ''
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация паролей
    if (formData.password !== formData.confirmPassword) {
      setErrors({
        general: 'Validation failed',
        fields: {
          password: 'Passwords do not match',
          confirmPassword: 'Passwords do not match'
        }
      });
      return;
    }

    try {
      const response = await apiClient.post('/users/auth/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      }, {skipAuth: true});

      console.log('Full response:', response);  // нужно для отладки

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/profile');
    } catch (err) {
      if (err.response?.data) {
        // Обработка ошибок валидации от сервера
        const serverErrors = err.response.data;
        const fieldErrors = {};

        // Преобразуем ошибки Django REST framework в удобный формат
        if (serverErrors.username) {
          fieldErrors.username = Array.isArray(serverErrors.username)
            ? serverErrors.username.join(' ')
            : serverErrors.username;
        }
        if (serverErrors.email) {
          fieldErrors.email = Array.isArray(serverErrors.email)
            ? serverErrors.email.join(' ')
            : serverErrors.email;
        }
        if (serverErrors.password) {
          fieldErrors.password = Array.isArray(serverErrors.password)
            ? serverErrors.password.join(' ')
            : serverErrors.password;
        }

        setErrors({
          general: serverErrors.detail || 'Регистрация не удалась. Пожалуйста, исправьте ошибки, указанные ниже.',
          fields: fieldErrors
        });

        if (Object.keys(fieldErrors).length > 0) {
          setOpenErrors(true);
        }
      } else {
        setErrors({
          general: 'Ошибка сети. Пожалуйста, повторите попытку позже.',
          fields: {}
        });
      }
    }
  };

  const hasErrors = errors.general || Object.values(errors.fields).some(e => e);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        {hasErrors && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                color: 'error.main'
              }}
              onClick={() => setOpenErrors(!openErrors)}
            >
               {/* интерактивное отображение ошибок валидации в форме регистрации.*/}
              <Typography color="error">
                {errors.general}
              </Typography>
              {Object.keys(errors.fields).length > 0 && (
                <IconButton size="small">
                  {openErrors ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
            </Box>

            <Collapse in={openErrors} timeout="auto" unmountOnExit>
              <List dense sx={{ width: '100%' }}>
                {Object.entries(errors.fields).map(([field, errorMsg]) => (
                  errorMsg && (
                    <ListItem key={field} sx={{ py: 0 }}>
                      <ListItemText
                        primary={`${field.charAt(0).toUpperCase() + field.slice(1)}: ${errorMsg}`}
                        primaryTypographyProps={{ color: 'error' }}
                      />
                    </ListItem>
                  )
                ))}
              </List>
            </Collapse>
          </Box>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            error={Boolean(errors.fields.username)}
            helperText={errors.fields.username}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.fields.email)}
            helperText={errors.fields.email}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.fields.password)}
            helperText={errors.fields.password}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.fields.confirmPassword)}
            helperText={errors.fields.confirmPassword}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link href="/login" variant="body2">
              {"Already have an account? Login"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;