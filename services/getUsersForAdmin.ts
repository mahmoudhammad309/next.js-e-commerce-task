import axios from 'axios';

const API_URL = '/api/users';

export const getUsersForAdmin = async () => {
    console.log('11111111111111111')
  try {
    console.log("22222222222222222222222")
    const response = await axios.get(`${API_URL}`);
    console.log("333333333333333")

    console.log('Users:', response.data);
    return response.data;

  } catch (error) {
    console.log("44444444444444444")

    console.error('Error fetching users:', error);
    throw error;
  }
};