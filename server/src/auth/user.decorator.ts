import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export interface CurrentUserInfo {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  avatarPath: string;
}

export const CurrentUser = createParamDecorator((param: string, request: Request) => {
  return param ? request.user[param] : request.user;
});
