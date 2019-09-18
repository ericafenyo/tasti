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
 */

import { registerUser } from '../endpoints';

/**
  * @class
  * A User is an object with helper functions for performing
  * user-based data transactions. For example deleting a user account.
  */
class User {
	/**
   * Create a new user profile
   * 
   * @param {object} userInfo
   * @param {function} callback A function that receives the HTTP response.
   * @return an object with the loading, the success and the error state.
   */
	async signUp(userInfo : object, callback: Function) {
		try {
			const result = await registerUser(userInfo);
			callback(result);
			console.log('result', result);
		} catch (error) {
			console.log('Error', error);
		}
	}

	login(user : object) {
		console.log(user);
	}
}

export const user = new User();
