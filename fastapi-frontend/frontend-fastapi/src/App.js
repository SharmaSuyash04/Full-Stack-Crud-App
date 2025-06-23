import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import { getEmployees } from './services/api';
import { useNavigate } from 'react-router-dom';


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
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');  
  };

  return (
    
      <Routes>
        {!user && <Route path="*" element={<Navigate to="/login" />} />}
        {user && <Route path="*" element={<Navigate to="/dashboard" />} />}

        <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />

        <Route path="/dashboard" element={
          <Dashboard
            user={user}
            onLogout={handleLogout}
            employees={employees}
            refreshEmployees={fetchEmployees}
          />
        }>
          {/* 🟢 Nested route */}
          <Route path="employees" element={
            <EmployeeList employees={employees} refresh={fetchEmployees} />
          } />
        </Route>
      </Routes>
    
  );
}

export default App;

