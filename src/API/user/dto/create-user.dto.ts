export class RequestForFormData {
  body: CreateUserDto;
  file: FileShape;
}

export interface FileShape {
  location: string;
}

export class CreateUserDto {
  file?: any;
  name?: string;
  password?: string;
  kakao_id?: string;
  google_id?: string;
  email: string;
  birthday?: string;
  nickname?: string;
  thumbnail: string;
  gender?: UserGender;
  phone?: string;
}

enum UserGender {
  '여자' = 'female',
  '남자' = 'male',
}
