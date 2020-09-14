import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/interfaces/users.interfaces';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(username);
    // @WARN 普通はハッシュ化したものを比較する
    if (user != null && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { username: string; userId: number }) {
    // JWT の標準に倣って sub という名前にしている
    const payload = {
      username: user.username,
      sub: user.userId,
    };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
