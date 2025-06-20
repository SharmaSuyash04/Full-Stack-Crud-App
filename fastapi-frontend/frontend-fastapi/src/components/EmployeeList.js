import React from 'react';
import EmployeeItem from './EmployeeItem';
import { Typography, Card, CardContent } from '@mui/material';

const EmployeeList = ({ employees, refresh }) => {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Employee List
        </Typography>
        {employees.map(emp => (
          <EmployeeItem key={emp.id} employee={emp} refresh={refresh} />
        ))}
      </CardContent>
    </Card>
  );
};

export default EmployeeList;

