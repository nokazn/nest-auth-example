import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TODO } from 'src/types';

@Injectable()
// リクエストボディの username と password プロパティを呼んで検証する
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<TODO> {
    const user = await this.authService.validateUser(username, password);
    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
