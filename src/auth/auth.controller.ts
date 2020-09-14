import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './guard/localAuth.guard';
import { AuthService } from './auth.service';
import { TODO } from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // passport-local の strategy でガードする
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: TODO) {
    return this.authService.login(req.user);
  }
}
