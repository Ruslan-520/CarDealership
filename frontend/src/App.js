import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import CarsPage from './pages/Cars';
import ApplicationsPage from './pages/Applications';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Layout from './components/Layout';
import ProfilePage from './pages/Profile';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<CarsPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Rout path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;