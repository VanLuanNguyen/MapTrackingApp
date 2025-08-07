import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
});

// Hàm callback khi bị 401 (hết hạn đăng nhập)
let onUnauthorized = null;
export function setOnUnauthorized(cb) {
  onUnauthorized = cb;
}

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      if (onUnauthorized) onUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;