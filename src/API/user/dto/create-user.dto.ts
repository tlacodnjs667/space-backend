export class RequestForFormData {
  body: CreateUserDto;
  file: FileShape;
}
export class RequestForFormDataToUpdate {
  body: UpdateUserDto;
  file: FileShape;
  headers: IHeader;
}

export interface IHeader {
  user: number;
}
export interface FileShape {
  location: string;
}

export class CreateUserDto {
  file?: any;
  name?: string;
  password?: string | undefined;
  email: string;
  birthday?: string;
  nickname?: string;
  thumbnail: string;
  gender?: UserGender;
  phone?: string;
  google_id?: string;
  kakao_id?: string;
}

enum UserGender {
  '여자' = 'female',
  '남자' = 'male',
}

export class UpdateUserDto extends CreateUserDto {
  userPassword?: string;
}
