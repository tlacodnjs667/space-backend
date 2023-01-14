import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, ReturnCreated } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import jwt_decode from 'jwt-decode';
import { UserInfoForJWT } from './dto/make-user-jwt.dto';
import { GetGoogleUser } from './dto/get-google-user.dto';
dotenv.config();
@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}
  async createUser(user: CreateUserDto): Promise<ReturnCreated> {
    if (!user.kakao_id || !user.google_id) {
      //구글 정보 확인 한번 더 해야할 듯
      const checkForDuplicate = await UserRepository.checkUserInDB(user.email);

      if (checkForDuplicate.length) {
        throw new HttpException('DUPLICATED_EMAIL', HttpStatus.CONFLICT);
      }
      if (!user.password)
        throw new HttpException('CANNOT_FIND_PASSWORD', HttpStatus.NOT_FOUND);

      user.password = await bcrypt.hash(
        user.password,
        Number(process.env.SALTROUNDS),
      );
    }

    const queryForKeys = [];
    const queryForValues = [];

    for (const [key, value] of Object.entries(user)) {
      if (key) {
        queryForKeys.push(key);
        queryForValues.push("'" + value + "'");
      }
    }

    console.log('이게 될까?');

    return UserRepository.createUser(
      queryForKeys.join(', '),
      queryForValues.join(', '),
    );
  }

  async checkUser(user: LoginUserDto) {
    const [userInfoFromDB] = await UserRepository.checkUserInDB(user.email);
    console.log(userInfoFromDB);

    const checkForClient = await this.checkHash(
      user.password,
      userInfoFromDB.password,
    );

    if (!checkForClient) {
      throw new HttpException("PASSWORD_ISN'T_VALID", HttpStatus.UNAUTHORIZED);
    }
    const token = await this.getAccessToken(userInfoFromDB);
    return token;
  }

  async getInfoOfGoogleUser(credentialResponse: GetGoogleUser) {
    const decodedInfo: GoogleUserInfo = jwt_decode(
      credentialResponse.credential,
    );

    const checkGoogleUserInDB = await UserRepository.checkUserInDB(
      decodedInfo.email,
    );
    console.log(decodedInfo);
    const [checkUser] = checkGoogleUserInDB;

    if (checkGoogleUserInDB.length) {
      return {
        message: 'USER_LOGIN',
        access_token: await this.getAccessToken(checkUser),
      };
    }

    const user = {
      google_id: decodedInfo.iss,
      email: decodedInfo.email,
      thumbnail: decodedInfo.picture,
    };

    const { insertId } = await this.createUser(user);

    const UserInfoForToken: UserInfoForJWT = {
      email: decodedInfo.email,
      id: insertId,
    };

    return {
      insertId,
      message: 'USER_CREATED',
      access_token: await this.getAccessToken(UserInfoForToken),
    };
  }

  async kakaoLogin(token: string) {
    const urlForUserInfo = 'https://kapi.kakao.com/v2/user/me';
    const { data } = await axios.get(urlForUserInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const checkKakaoUserInDB = await UserRepository.checkUserInDB(
      data.kakao_account.email,
    );
    if (checkKakaoUserInDB.length) {
      const [KakaoUserInDB] = checkKakaoUserInDB;
      return { access_token: await this.getAccessToken(KakaoUserInDB) };
    }

    const user = {
      email: data.kakao_account.email,
      thumbnail: data.properties.thumbnail,
      gender: data.kakao_account.gender,
    };

    const { insertId } = await this.createUser(user);

    const UserInfoForToken: UserInfoForJWT = {
      id: insertId,
      email: data.kakao_account.email,
    };

    return {
      insertId,
      message: 'USER_CREATED',
      access_token: await this.getAccessToken(UserInfoForToken),
    };
  }

  /* 위에서 사용할 */

  async checkHash(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async getAccessToken(user: UserInfoForJWT) {
    return this.jwtService.sign(
      { email: user.email, userId: user.id },
      { secret: process.env.JWT_SECRETKEY, expiresIn: '1h' },
    );
  }
}

interface GoogleUserInfo {
  iss: string;
  email: string;
  name: string;
  picture: string;
}
