import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TODO } from 'src/types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err: Error, user: TODO, info: TODO) {
    if (err != null || user == null) {
      console.error(err, user, info);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
