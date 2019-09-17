// /**
//  * @license
//  * Copyright (c) 2019 Eric Afenyo
//  *
//  * Permission is hereby granted, free of charge, to any person obtaining a copy
//  * of this software and associated documentation files (the "Software"), to deal
//  * in the Software without restriction, including without limitation the rights
//  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  * copies of the Software, and to permit persons to whom the Software is
//  * furnished to do so, subject to the following conditions:
//  *
//  * The above copyright notice and this permission notice shall be included in all
//  * copies or substantial portions of the Software.
//  *
//  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  * SOFTWARE.
//  *
//  */

// /**
//   * @class 
//   * A Result is an object with the necessary UI states; 
//   * a loading state, a success state, and an error state. 
//   */
// class Result {
// 	constructor(builder ) {
// 		// Keep an instance of the core result states.
// 		// It is advisable to extend this class to add more states.
// 		this._loading = builder.loading;
// 		this._success = builder.success;
// 		this._error = builder.error;
// 	}

// 	/**
//    * @class
//    * Creates a {@link Result} using the builder pattern.
//    */
// 	static get Builder() {
// 		class Builder {
// 			/**
//    * A setter for a loading state. 
//    * @param {boolean} loading 
//    */
// 			setLoading(loading = false) {
// 				console.log('loading', loading);
// 				this._loading = loading;
// 				return this;
// 			}

// 			/**
//    * A setter for a success state. 
//    * @param {function} loading 
//    */
// 			setSuccess(success) {
// 				console.log('success', success);

// 				this._success = success;
// 				return this;
// 			}
// 			/**
//    * A setter for an error state. 
//    * @param {boolean} loading 
//    */
// 			setError(error = false) {
// 				console.log('error', error);
// 				this._error = error;
// 				return this;
// 			}

// 			build() {
// 				return new Result(this);
// 			}
// 		}
// 		return Builder;
// 	}
// }

// export default Result;
