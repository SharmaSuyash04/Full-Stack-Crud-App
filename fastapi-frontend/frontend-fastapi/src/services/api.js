import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // Your FastAPI backend
});

export const getEmployees = async () => {
  const res = await API.get('/employees');
  return res.data;
};

export const addEmployee = async (employee) => {
  const res = await API.post('/employees', employee);
  return res.data;
};

export const deleteEmployee = async (id) => {
  await API.delete(`/employees/${id}`);
};

export const updateEmployee = async (id, data) => {
  const res = await API.put(`/employees/${id}`, data);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await API.post('/login', credentials); // Adjust endpoint if different
  return res.data;
};

