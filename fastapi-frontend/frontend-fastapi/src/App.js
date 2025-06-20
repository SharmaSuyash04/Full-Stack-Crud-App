import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from '@mui/material';

import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import LoginForm from './components/LoginForm';
import { getEmployees } from './services/api';

const drawerWidth = 240;

function App() {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [activePage, setActivePage] = useState('');

  const getAllEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    if (user) {
      getAllEmployees();
    }
  }, [user]);

  const handleOpenForm = () => setOpenDialog(true);
  const handleCloseForm = () => setOpenDialog(false);
  const handleEmployeeAdded = () => {
    getAllEmployees();
    handleCloseForm();
  };

  const handleLoginSuccess = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

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
            backgroundColor: 'orange'
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => setActivePage('employeeList')}>
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
            <Typography variant="h6">Employee,{user}</Typography>
            <Button color="inherit" onClick={handleLogout} sx={{backgroundColor:"red"}}>Logout</Button>
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
              <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
            </DialogContent>
          </Dialog>

          {activePage === 'employeeList' && (
            <EmployeeList employees={employees} refresh={getAllEmployees} />
          )}

          {activePage !== 'employeeList' && (
            <Typography variant="body1" color="text.secondary">
              Select a section from the sidebar.
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default App;
