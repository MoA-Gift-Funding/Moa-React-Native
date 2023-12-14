import {Category, Product, ProductDetail} from '../../types/Store';
import {Axios} from '../axios.config';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await Axios.get('/category/get-category')
      .then(res => {
        return res.data;
      })
      .then(res => res.data.categories)
      .catch(err => console.log(err));
    return categories;
  } catch (error: any) {
    console.log(error.response);
    throw new Error('[ERROR] Categories를 가져오지 못함');
  }
};

export const getProducts = async (page: number = 0): Promise<Product[]> => {
  try {
    const products = await Axios.get(
      `/products/get-product-list?page=${page}&size=6`,
    )
      .then(res => {
        return res.data;
      })
      .then(res => res.data.products)
      .catch(err => console.log(err));
    return products;
  } catch (error: any) {
    console.log(error.response);
    throw new Error('[ERROR] Products 리스트를 가져오지 못함');
  }
};

export const getCategoryProducts = async (
  categoryType: string,
  page: number,
): Promise<Product[]> => {
  try {
    const products = await Axios.get(
      `/products/get-category-product-list/${categoryType}/popular?page=${page}&size=6`,
    )
      .then(res => {
        console.log(res.data);

        return res.data;
      })
      .then(res => res.data.products)
      .catch(err => console.log(err));
    return products;
  } catch (error: any) {
    console.log(error.response);
    throw new Error('[ERROR] Products를 가져오지 못함');
  }
};

export const getProduct = async (productId: number): Promise<ProductDetail> => {
  try {
    const product = await Axios.get(`/products/get-product/${productId}`)
      .then(res => {
        console.log(res.data);
        return res.data.data;
      })
      .catch(err => console.log(err.response));
    return product;
  } catch (error: any) {
    console.log(error.response);
    throw new Error('[ERROR] Product를 가져오지 못함');
  }
};
