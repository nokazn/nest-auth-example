import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;
if (SECRET == null) {
  console.error('環境変数が設定されていません。', process.env);
  throw new Error();
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET,
    });
  }

  async validate(payload: { username: string; sub: number }) {
    return {
      username: payload.username,
      userId: payload.sub,
    };
  }
}
