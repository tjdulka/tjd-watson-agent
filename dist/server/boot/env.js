'use strict';

var _cfenv = require('cfenv');

var _cfenv2 = _interopRequireDefault(_cfenv);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** VCAP services */
var vcapServices = {};

/** Environemnt variables */
/**
* @Date:   2017-01-11T15:25:03-06:00
* @Last modified time: 2017-03-03T10:35:31-06:00
* @License: Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
  limitations under the License.

* @Copyright: Copyright 2016 IBM Corp. All Rights Reserved.
*/

/**
 * @title env/env
 * @overview Boot script to load environent variables, VCAP services, and other environment level configuration
 */
var envVars = {};

/** Cloud foundry app environment */
var appEnv = _cfenv2.default.getAppEnv();
// dotenv.config()

if (process.env.VCAP_SERVICES) {
  vcapServices = JSON.parse(process.env.VCAP_SERVICES);
  /** otherwise use our JSON file */
} else if (appEnv.VCAP_APPLCATION) {
  vcapServices = appEnv.getServices();
} else {
  try {
    vcapServices = JSON.parse(_fs2.default.readFileSync('./vcap.env', 'utf8'));
  } catch (e) {
    console.log('no development vcap.env file found');
  }
}
/** If running in Bluemix, use the environment variables */
process.env.CONVERSATION_API_URL = appEnv.CONVERSATION_API_URL || process.env.CONVERSATION_API_URL;
process.env.ALCHEMY_API_KEY = appEnv.ALCHEMY_API_KEY || process.env.ALCHEMY_API_KEY;
process.env.ALCHEMY_BASE_URL = appEnv.ALCHEMY_BASE_URL || process.env.ALCHEMY_BASE_URL;
process.env.ALCHEMY_SENTIMENT_PATH = appEnv.ALCHEMY_SENTIMENT_PATH || process.env.ALCHEMY_SENTIMENT_PATH;
process.env.ALCHEMY_EMOTION_PATH = appEnv.ALCHEMY_EMOTION_PATH || process.env.ALCHEMY_EMOTION_PATH;

/** For display */
envVars.CONVERSATION_API_URL = process.env.CONVERSATION_API_URL;
envVars.ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
envVars.ALCHEMY_BASE_URL = process.env.ALCHEMY_BASE_URL;
envVars.ALCHEMY_SENTIMENT_PATH = process.env.ALCHEMY_SENTIMENT_PATH;
envVars.ALCHEMY_EMOTION_PATH = process.env.ALCHEMY_EMOTION_PATH;

/** Application Constants */
var CONSTANTS = {
  API_PROP_SUGGEST: 'propertySuggestion'
};

global.CONSTANTS = CONSTANTS;
/**
 * Prints information about the environment
 *
 * @return {void}
 */
function printEnvInfo() {
  console.log('---CUSTOM ENV VARIABLES---');
  console.log(envVars);
  console.log('------APP ENVIRONMENT------');
  console.log(appEnv);
  console.log('-------VCAP SERVICES-------');
  console.log(_util2.default.inspect(vcapServices, { depth: 5 }));
  console.log('---------CONSTANTS---------');
  console.log(CONSTANTS);
}

module.exports = function (app) {
  printEnvInfo();
  global.thisApp = app;
  global.appEnv = appEnv;

  /**
   * Set environment variables as express properties
   * Acess through app.get('VARIABLE_NAME') where app is your express app
   */
  for (var prop in global.envVars) {
    app.set(prop, global.envVars[prop]);
  }
};