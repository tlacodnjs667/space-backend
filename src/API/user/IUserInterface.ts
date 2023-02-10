export interface UserInfoToOrder {
  name: string;
  email: string;
  phone: string;
  points: number;
  address: string;
  detail_address: string;
  zip_code: string;
}

export interface ValidatedUser {
  id: number;
  email: string;
  password: string;
  gender?: string;
  google_id?: string;
  kakao_id?: string;
}

export interface IUserInfoToChange {
  email: string;
  name: string;
  birthday: string;
  nickname: string;
  thumbnail: string;
  gender: string;
  phone: string;
  google_id?: string;
  kakao_id?: string;
  is_social?: boolean;
}
