/**
 * @license
 * Copyright (c) 2019 Eric Afenyo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @file
 * Contains some helper functions for accessing web services.
 */

import { http, buildRequest, authHttp } from '../ConnectionHelper';
import { AxiosPromise, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Result } from '../../data/Result';
import { async } from 'rxjs/internal/scheduler/async';
import { HttpStatus } from '@/enums';

export interface UserService {
  create: (user: any) => Promise<Result>;

  authenticate: (username: string, password: string) => Promise<Result>;

  profile: () => AxiosPromise<any>;

  /**
   * 
   */
  followers: (userId: string) => AxiosPromise<any>;
}

export class UserServiceImpl implements UserService {
  profile() {
    return authHttp.get('users');
  }

  followers(userId: string) {
    if (!userId) {
      throw 'Log out, user id is null';
    }
    return authHttp.get(`users/${userId}/followers`);
  }

  /**
   * Creates a new user account
   * @param user a javaScript object containing user related resources 
   */
  create(user: any): Promise<Result> {
    return buildRequest(() => http.post('/users/create', user));
  }

  authenticate(username: string, password: string): Promise<Result> {
    return buildRequest(() => http.post('/auth/login', { username, password }));
  }
}
