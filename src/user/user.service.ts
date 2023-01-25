import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import axios from 'axios';

@Injectable()
export class UserService {
  async kakaoLogin(code: string): Promise<void> {
    const kakao_api_url = `https://kauth.kakao.com/oauth/token
	?grant_type=authorization_code
	&client_id=${process.env.KAKAO_CLIENT_ID}
	&redirect_url=${process.env.KAKAO_REDIRECT_URL}
	&code=${code}`;

    const returns = await axios.post(kakao_api_url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const { access_token } = returns.data;
    console.log(access_token);

    const urlForUserInfo = 'https://kapi.kakao.com/v2/user/me';
    const user_ifo = await axios.get(urlForUserInfo, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const idd: string = user_ifo.data;
    console.log(idd);
  }
}
