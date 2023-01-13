export class CreateUserDto {
  name: string;
  password: string;
  kakao_id?: string;
  email: string;
  birthday: string;
  nickname: string;
  thumbnail?: string;
  gender: UserGender;
  phone: string;
}

enum UserGender {
  '여자' = 'female',
  '남자' = 'male',
}

export interface ReturnCreated {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}
