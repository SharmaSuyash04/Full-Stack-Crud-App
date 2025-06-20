import React, { useState } from 'react';
import { deleteEmployee, updateEmployee } from '../services/api';
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Paper,
} from '@mui/material';

const EmployeeItem = ({ employee, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: employee.first_name,
    last_name: employee.last_name,
    email: employee.email,
    salary: employee.salary,
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    await deleteEmployee(employee.id);
    refresh();
  };

  const handleUpdate = async () => {
    await updateEmployee(employee.id, form);
    setIsEditing(false);
    refresh();
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      {isEditing ? (
        <Stack spacing={1}>
          <TextField name="first_name" value={form.first_name} onChange={handleChange} label="First Name" />
          <TextField name="last_name" value={form.last_name} onChange={handleChange} label="Last Name" />
          <TextField name="email" value={form.email} onChange={handleChange} label="Email" />
          <TextField name="salary" value={form.salary} onChange={handleChange} label="Salary" />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handleUpdate}>Save</Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
          </Stack>
        </Stack>
      ) : (
        <Box>
          <Typography variant="h6">
            {employee.first_name} {employee.last_name}
          </Typography>
          <Typography>{employee.email}</Typography>
          <Typography>₹{employee.salary}</Typography>
          <Stack direction="row" spacing={1} mt={1}>
            <Button variant="contained" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
          </Stack>
        </Box>
      )}
    </Paper>
  );
};

export default EmployeeItem;
