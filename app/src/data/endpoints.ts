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
 *
 * To use these helper functions;
 * 1: Install axios using `yarn add axios` or `npm install axios`
 * 2: Import them into your JavaScript file using
 * `import { '<function names separated with a comma>' } from '<path>;`
 * 3: Invoke the function of your choice and pass the required parameters.
 */



/**
 * Performs an HTTP request using the [axios api]{@link https://github.com/axios/axios}
 * @param {string} path The URL path to be appended to the base server URL.
 * @param {object} params Optional: The URL parameters to be sent with the request.
 * @param {Type} params Optional: The URL parameters to be sent with the request.
 */
export const registerUser = (user: object) => {
	try {
		const response = instance.post('/users/register', user);
		return response;
	} catch (error) {
		console.log('Error during user registration', error);
		return 'Error';
		// return new Result.Builder().setError(true).build();
	}
};

export const createRecipe = (userId: number, recipe: object) => {
	const headers = { 'Content-Type': 'multipart/form-data' };

	try {
		console.log(recipe);
		const response = instance.post(`recipes/${userId}`, recipe, { headers });
		console.log(response);
	} catch (error) {
		console.log('Error', error);
	}
};
