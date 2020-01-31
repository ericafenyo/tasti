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

import { http, invokeHttpRequest, authHttp } from '../ConnectionHelper';
import { AxiosPromise, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Result } from '../../data/Result';

export interface UserService {
  createAccount: (user: any) => AxiosPromise<any>;

  authenticate: (username: string, password: string) => AxiosPromise<any>;

  profile: () => AxiosPromise<any>;
}

export class UserServiceImpl implements UserService {
  profile() {
    return authHttp.get('users');
  }

  /**
   * 
   * @param user
   */
  async createAccount(user: any) {
    return await http.post('/users/new', user);
  }

  async authenticate(username: string, password: string): Promise<AxiosResponse<any>> {
    // TODO: Encrypt password before sending
    return await http.post('/auth/login', { username, password });
  }
}
