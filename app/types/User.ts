export type OauthProvider = 'APPLE' | 'KAKAO' | 'NAVER';
export interface User {
  id: number;
  oauthId: string;
  oauthProvider: OauthProvider;
  email?: string;
  nickname?: string;
  profileImageUrl?: string;
  birthday?: string;
  birthyear?: string;
  phoneNumber?: string;
  status: 'PRESIGNED_UP' | 'SIGNED_UP';
  joinProcess?: string;
}

export type UserFormData = {
  nickname: string;
  phoneNumber: string;
  birthday: string;
  birthyear: string;
  fullBirthday: string;
};

export type UserContact = {
  contactList: Contact[];
};

export type Contact = {
  name: string | undefined;
  phoneNumber: string | undefined;
};
