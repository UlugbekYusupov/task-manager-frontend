import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const createProject = async (
  data: { name: string; description: string },
  token: string
) => {
  const response = await axios.post(`${API_BASE_URL}/projects`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
