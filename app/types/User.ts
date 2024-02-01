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
}

export type UserFormData = {
  nickname: string;
  phoneNumber: string;
  email: string;
};

export type UserContact = {
  contactList: Contact[];
};

export type Contact = {
  name: string | undefined;
  phoneNumber: string | undefined;
};

export type Friend = {
  birthday: string;
  birthyear: string;
  customNickname: string;
  id: number;
  isBlocked: false;
  memberId: number;
  phoneNumber: string;
  profileImageUrl: string;
  realNickName: string;
};
