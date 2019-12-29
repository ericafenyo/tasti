import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

const { expiresIn, issuer, secret } = jwtConstants;
const jwtModuleOptions: JwtModuleOptions = {
  secret,
  signOptions: { expiresIn, issuer }
};

@Module({
  imports: [ UserModule, PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register(jwtModuleOptions) ],
  providers: [ AuthService, LocalStrategy, JwtStrategy ],
  exports: [ AuthService ]
})
export class AuthModule {}
