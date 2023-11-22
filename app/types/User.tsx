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
