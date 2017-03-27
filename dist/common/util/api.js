'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genericRequestRawPromise = exports.genericRequestPromise = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function genericRequestPromise(options) {
  return new Promise(function (resolve, reject) {
    (0, _request2.default)(options, function (error, response, body) {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(JSON.parse(body));
    });
  });
} /**
  * @Date:   2016-12-13T18:36:13-06:00
  * @Last modified time: 2017-03-03T10:35:21-06:00
  * @License: Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
        http://www.apache.org/licenses/LICENSE-2.0
  
    Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
    limitations under the License.
  
  * @Copyright: Copyright 2016 IBM Corp. All Rights Reserved.
  */

function genericRequestRawPromise(options) {
  return new Promise(function (resolve, reject) {
    (0, _request2.default)(options, function (error, response, body) {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(body);
    });
  });
}

exports.genericRequestPromise = genericRequestPromise;
exports.genericRequestRawPromise = genericRequestRawPromise;