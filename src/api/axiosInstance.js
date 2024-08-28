import axios from "axios";
const SERVERURL="https://restraunt-api.onrender.com"
// const SERVERURL="http://localhost:5000/"
const axiosInstance = axios.create({
  baseURL: SERVERURL,  
  timeout: 30000,  
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;


