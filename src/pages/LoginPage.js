import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

const LoginPage = ({ onLogin, onBack }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Gọi API đăng nhập bằng axios, withCredentials: true để lưu cookie session_user
      const response = await axiosInstance.post(
        'http://localhost:5000/api/login',
        {
          username: formData.username,
          PIN: formData.password
        }
      );

      if (response.status === 200) {
        onLogin({ username: formData.username });
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      } else {
        console.error('Lỗi khi đăng nhập:', err);
        setError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Đăng nhập</h1>
          <p>Vui lòng đăng nhập để xem chi tiết</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={onBack}
              className="btn-secondary"
            >
              Quay lại
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 