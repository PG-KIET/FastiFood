import axios from "axios";
import { BASE_URL } from "./config";

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`)
        return response.data
    } catch (error) {
        console.error('Categories Error: ', error);  
        return []
    }
};

export const getProductByCategoryId = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`)
        return response.data
    } catch (error) {
        console.error('Categories Error: ', error);  
        return []
    }
};

export const searchProductByName = async (name: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/search/${name}`);
      return response.data;
    } catch (error) {
    //   console.error('Search Error: ', error);
      return [];
    }
  };
  
