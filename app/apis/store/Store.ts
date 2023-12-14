import {Category, Product} from '../../types/Store';
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

export const getProducts = async (
  category: string,
  page: number,
): Promise<Product[]> => {
  try {
    const products = await Axios.get(
      `/products/get-category-product-list/${category}/popular?page=${page}&size=6`,
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
