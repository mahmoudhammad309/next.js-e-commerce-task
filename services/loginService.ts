import { nextAxiosInstance } from '../utils/axios';

export const loginService = async (data: { email: string; password: string }) => {
  try {
    const response = await nextAxiosInstance.post('/login', data);
    return response.data;
  } catch {
    throw new Error('Login failed. Please try again.');
  }
};
