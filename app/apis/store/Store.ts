import {Category} from '../../types/Store';
import {Axios} from '../axios.config';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await Axios.get('/category/get-category')
      .then(res => {
        console.log(res.data);
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
