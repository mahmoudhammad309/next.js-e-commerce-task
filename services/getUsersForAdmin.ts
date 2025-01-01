import axios from 'axios';

const API_URL = '/api/users';

export const getUsersForAdmin = async () => {
  try {
    const response = await axios.get(`${API_URL}`);

    return response.data;

  } catch (error) {

    console.error('Error fetching users:', error);
    throw error;
  }
};