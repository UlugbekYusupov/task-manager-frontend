import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};
