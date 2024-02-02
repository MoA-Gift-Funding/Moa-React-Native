import {Fund} from '../../types/Funding';
import {Axios} from '../axios.config';

export default class Funding {}

export const createFund = async (params: Fund) => {
  try {
    const result = await Axios.post('/funding/create-funding', params)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => console.log(error.response));
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('[ERROR] 네트워크 에러');
  }
};
