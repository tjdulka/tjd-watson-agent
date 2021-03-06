'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* @Date:   2016-12-13T01:51:35-06:00
* @Last modified time: 2017-03-03T10:35:23-06:00
* @License: Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
  limitations under the License.

* @Copyright: Copyright 2016 IBM Corp. All Rights Reserved.
*/

function getBaseUrl(req) {
  return req.protocol + '://' + req.get('host');
}

exports.getBaseUrl = getBaseUrl;
/*
module.exports = {
  getBaseUrl: getBaseUrl
}
*/