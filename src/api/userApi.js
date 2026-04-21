import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/get/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
