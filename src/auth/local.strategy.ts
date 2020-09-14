import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from 'src/users/interfaces/users.interfaces';

@Injectable()
// リクエストボディの username と password プロパティを呼んで検証する
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  // 第一引数に request をとれる
  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    // リクエストに割り当てられた contextId からリクエストごとにモジュールを初期化する
    const contextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    // "AuthService" is a request-scoped provider
    const user = await authService.validateUser(username, password);
    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
