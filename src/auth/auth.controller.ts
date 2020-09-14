import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TODO } from 'src/types';

@Controller('auth')
export class AuthController {
  // passport-local の strategy でガードする
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: TODO) {
    return req.user;
  }
}
