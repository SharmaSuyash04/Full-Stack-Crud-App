import React, { useState } from 'react';
import { addEmployee } from '../services/api';
import { TextField, Button, Box, Grid } from '@mui/material';

const EmployeeForm = ({ onEmployeeAdded }) => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    salary: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addEmployee(form);
    setForm({ first_name: '', last_name: '', email: '', salary: '' });
    if (onEmployeeAdded) onEmployeeAdded();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        {['first_name', 'last_name', 'email', 'salary'].map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              name={field}
              label={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              value={form[field]}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Add Employee
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeForm;
