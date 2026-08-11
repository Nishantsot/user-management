import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// GET - Fetch all users
export const getUsers = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// POST - Create user
export const createUser = async (user) => {
  const response = await axios.post(API_URL, user);

  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/${id}`, user);

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};