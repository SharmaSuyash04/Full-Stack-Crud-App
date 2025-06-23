import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText,
  Button, Dialog, DialogTitle, DialogContent, Container, Box
} from '@mui/material';

import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import { Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Dashboard = ({ user, onLogout, employees, refreshEmployees }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOpenForm = () => setOpenDialog(true);
  const handleCloseForm = () => setOpenDialog(false);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'orange',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => navigate('/dashboard/employees')}>
              <ListItemText primary="Employee List" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#2e7d32',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Welcome, {user}</Typography>
            <Button color="inherit" onClick={onLogout} sx={{ backgroundColor: 'red' }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Toolbar />
        <Container sx={{ mt: 4 }}>
          <Button variant="contained" onClick={handleOpenForm} sx={{ mb: 3 }}>
            Add Employee
          </Button>

          <Dialog open={openDialog} onClose={handleCloseForm} fullWidth maxWidth="sm">
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogContent>
              <EmployeeForm onEmployeeAdded={() => {
                refreshEmployees();
                handleCloseForm();
              }} />
            </DialogContent>
          </Dialog>

          {/* 🔥 Render child route (like /dashboard/employees) here */}
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;

