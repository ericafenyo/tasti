import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate({ sub, email }: any) {
    const hasUser = await this.authService.hasUser(sub, email);
    if (!hasUser) {
      throw new UnauthorizedException();
    }
    return {
      id: sub,
      email: email
    };
  }
}
