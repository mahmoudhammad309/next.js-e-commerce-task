import { nextAxiosInstance } from '../utils/axios';

export const signupService = async (data: { email: string; password: string }) => {
  try {
    const response = await nextAxiosInstance.post('/signup', data);
    return response.data;
  } catch {
    throw new Error('signup failed. Please try again.');
  }
};
