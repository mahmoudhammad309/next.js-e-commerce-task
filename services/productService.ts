import { axiosInstance } from '../utils/axios';

const API_URL = '/api';

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
    console.log("1111111111111111111")
    console.log(id)
    const response = await axiosInstance.get(`/products/${id}`);
    console.log("2222222222222")
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log("erroorrrrrrrrrrrrrr")
    console.log(error)
    console.error('Error fetching products:', error);
    throw error;
  }
};
