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
}
