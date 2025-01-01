import { axiosInstance } from '../utils/axios';

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(`/products`);

    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const getProductById = async (id: string) => {
  try {
    console.log(id)
    const response = await axiosInstance.get(`/products/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error)
    console.error('Error fetching products:', error);
    throw error;
  }
};
