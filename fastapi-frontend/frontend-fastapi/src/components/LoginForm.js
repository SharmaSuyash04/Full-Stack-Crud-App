import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';

const LoginForm = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      if (isSignup) {
        // Sign Up API
        await axios.post('http://localhost:8000/signup', form);
        alert('Signup successful! You can now log in.');
        setIsSignup(false); // switch to login
        setForm({ username: '', password: '' }); // clear form
      } else {
        // Login API
        const res = await axios.post('http://localhost:8000/login', form);
        onLoginSuccess(res.data.username);
      }
    } catch (err) {
      setError(err?.response?.data?.detail || 'Something went wrong');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 350, mx: 'auto', mt: 10, p: 3, border: '1px solid #ccc', borderRadius: 2 }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        {isSignup ? 'Sign Up' : 'Login'}
      </Typography>

      <TextField
        fullWidth
        name="username"
        label="Username"
        value={form.username}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        name="password"
        label="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        margin="normal"
      />

      {error && <Typography color="error">{error}</Typography>}

      <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
        {isSignup ? 'Create Account' : 'Login'}
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Link component="button" variant="body2" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Login' : 'Sign Up'}
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;

