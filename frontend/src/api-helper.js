import axios from 'axios';

export const createSession = async (sessionData) => {
  try {
    const response = await axios.post('http://localhost:3000/sessions', sessionData);
    return response.data;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
};

export const getSessionsByUserId = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/sessions/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting sessions:', error);
      throw error;
    }
  };

export const getUserbyId = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting sessions:', error);
    throw error;
  }
};

export const checkAdmin = async (userId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/check-admin/${userId}`);
    return response.data.result; // should return true or false
  } catch (error) {
    console.error('Error Checking Admin:', error);
    throw error;
  }
};