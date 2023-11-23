import {z} from 'zod';

export const autoHyphen = (text: string) => {
  const reformed = text
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/(\-{1,2})$/g, '');
  return reformed;
};

export const autoDash = (text: string) => {
  const reformed = text
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1/$2/$3')
    .replace(/(\/{1,2})$/g, '');
  return reformed;
};
export const LoginUser = z.object({
  nickname: z.string(),
  birthday: z.string(),
  birthyear: z.string(),
  // phoneNumber: z.string().transform(numbers=> numbers.split("")),
});
