export interface User {
  accessToken: string;
  email?: string;
  nickname: string;
  profileImage: string;
  birthday?: string;
  birthyear?: string;
  phoneNumber: string;
  level: 'ASSOCICATE_MEMBER' | 'REGULAR_MEMBER';
}
export type UserFormData = {
  nickname: string;
  phoneNumber: number;
  birthday: string;
  birthyear: string;
  fullBirthday: string;
};

export type UserContact = {
  name: string | undefined;
  phoneNumber: string | undefined;
};
