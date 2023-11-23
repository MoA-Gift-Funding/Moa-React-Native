import {z} from 'zod';

export const LoginUser = z.object({
  nickname: z.string(),
  birthday: z.string(),
  birthyear: z.string(),
  phoneNumber: z.string(),
  fullBirthday: z.coerce.date(),
});
