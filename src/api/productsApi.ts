import {API_BASE_URL, PAGE_SIZE} from '../utils/constants';
import type {ProductsResponse} from '../types/product';

const request = async (url: string): Promise<ProductsResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Unable to fetch products. Please try again.');
  }
  return response.json() as Promise<ProductsResponse>;
};

export const fetchProducts = async (
  page: number,
): Promise<ProductsResponse> => {
  const skip = page * PAGE_SIZE;
  const url = `${API_BASE_URL}/products?limit=${PAGE_SIZE}&skip=${skip}`;

  try {
    return await request(url);
  } catch (error) {
    throw error;
  }
};

export const searchProducts = async (
  query: string,
  page: number,
): Promise<ProductsResponse> => {
  const skip = page * PAGE_SIZE;
  const url = `${API_BASE_URL}/products/search?q=${encodeURIComponent(
    query,
  )}&limit=${PAGE_SIZE}&skip=${skip}`;

  try {
    return await request(url);
  } catch (error) {
    throw error;
  }
};
