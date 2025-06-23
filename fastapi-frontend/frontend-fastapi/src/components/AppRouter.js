//React Router gives your React app multiple "pages" based on URL
//  — without reloading the whole app. It's essential for scalable apps with login/signup, dashboards, settings pages, etc.
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import App from '../App';

const AppRouter = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginForm onLoginSuccess={() => setLoggedIn(true)} />}
      />
      <Route
        path="/app"
        element={loggedIn ? <App /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
