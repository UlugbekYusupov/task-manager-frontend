import axios from "axios";

const API_BASE_URL = "https://task-manager-backend-p89j.onrender.com/api/auth";

export const registerUser = async (data: {
  username?: string;
  email: string;
  password: string;
}) => {
  return axios.post(`${API_BASE_URL}/register`, data);
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/login`, credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
};
