import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/localAuth.guard';

import { TODO } from 'src/types';

@Controller('auth')
export class AuthController {
  // passport-local の strategy でガードする
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: TODO) {
    return req.user;
  }
}
