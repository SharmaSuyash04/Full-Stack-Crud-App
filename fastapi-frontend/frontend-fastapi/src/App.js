import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import { getEmployees } from './services/api';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();


  const fetchEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    if (user) {
      fetchEmployees();
    }
  }, [user]);

  const handleLoginSuccess = (username) => {
    setUser(username);
    localStorage.setItem('user', username);
     navigate('/dashboard'); //  Redirect to dashboard after login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');  
  };

  return (
    
     <Routes>
  {/* Public Route */}
  <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />

  {/* Protected Dashboard route with nested routes */}
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard
          user={user}
          onLogout={handleLogout}
          refreshEmployees={fetchEmployees}
        />
      </PrivateRoute>
    }
  >
    {/*  Nested Route inside /dashboard (Outlet will render this) */}
    <Route
      path="employees"
      element={
        <EmployeeList
          employees={employees}
          refresh={fetchEmployees}
        />
      }
    />
  </Route>

  {/* Fallback Redirect */}
  <Route
    path="*"
    element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
  />
</Routes>

    
  );
}

export default App;

