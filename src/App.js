import React, { useState, useEffect } from 'react';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import 'react-datepicker/dist/react-datepicker.css';
import { setOnUnauthorized } from './utils/axiosInstance';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Lỗi khi đọc dữ liệu người dùng:', error);
        localStorage.removeItem('userData');
      }
    }
  }, []);

  useEffect(() => {
    setOnUnauthorized(() => {
      setUser(null);
      localStorage.removeItem('userData');
      localStorage.removeItem('deviceSelectState');
    });
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    alert(`Chào mừng ${userData.username}! Bạn đã đăng nhập thành công.`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('deviceSelectState');
  };

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to="/home" replace /> : <LoginPage onLogin={handleLogin} onBack={() => {}} />
      } />
      <Route path="/home" element={
        user ? <HomePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
      } />
      <Route path="*" element={<Navigate to={user ? "/home" : "/login"} replace />} />
    </Routes>
  );
}

export default App;
