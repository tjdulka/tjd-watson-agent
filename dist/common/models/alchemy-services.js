/**
* @Date:   2017-01-11T15:25:03-06:00
* @Last modified time: 2017-03-03T10:35:12-06:00
* @License: Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
  limitations under the License.

* @Copyright: Copyright 2016 IBM Corp. All Rights Reserved.
*/

'use strict';

var _api = require('../util/api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (AlchemyServices) {
  AlchemyServices.disableRemoteMethod('invoke', true);
  // Define the getSentiment method
  AlchemyServices.getSentiment = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(text, cb) {
      var sentiment;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              sentiment = {};
              _context.prev = 1;
              _context.next = 4;
              return (0, _api.genericRequestPromise)({
                url: process.env.ALCHEMY_BASE_URL + process.env.ALCHEMY_SENTIMENT_PATH,
                method: 'POST',
                qs: {
                  apikey: process.env.ALCHEMY_API_KEY,
                  text: text,
                  outputMode: 'json'
                }
              });

            case 4:
              sentiment = _context.sent;
              _context.next = 11;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](1);

              console.log(_context.t0);
              throw _context.t0;

            case 11:
              if (!(sentiment && sentiment.docSentiment)) {
                _context.next = 15;
                break;
              }

              return _context.abrupt('return', [sentiment.docSentiment.score || 0, sentiment.docSentiment.type || 'unknown']);

            case 15:
              return _context.abrupt('return', [0, 'unknown']);

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  // Define the getEmotion method
  AlchemyServices.getEmotion = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(text, cb) {
      var emotions, highScore, primaryEmotion, property;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              emotions = {};
              _context2.prev = 1;
              _context2.next = 4;
              return (0, _api.genericRequestPromise)({
                url: process.env.ALCHEMY_BASE_URL + process.env.ALCHEMY_EMOTION_PATH,
                method: 'POST',
                qs: {
                  apikey: process.env.ALCHEMY_API_KEY,
                  text: text,
                  outputMode: 'json'
                }
              });

            case 4:
              emotions = _context2.sent;
              _context2.next = 11;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](1);

              console.log(_context2.t0);
              throw _context2.t0;

            case 11:
              highScore = -1;
              primaryEmotion = '';

              if (!emotions.docEmotions) {
                _context2.next = 17;
                break;
              }

              for (property in emotions.docEmotions) {
                if (Number(emotions.docEmotions[property]) > highScore) {
                  primaryEmotion = property;
                  highScore = Number(emotions.docEmotions[property]);
                } else if (Number(emotions.docEmotions[property]) === highScore) {
                  primaryEmotion += ', ' + property;
                }
              }
              _context2.next = 18;
              break;

            case 17:
              return _context2.abrupt('return', ['no emotion', 0]);

            case 18:
              return _context2.abrupt('return', [highScore === 0 ? 'no emotion' : primaryEmotion, highScore]);

            case 19:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 7]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Register the Remote Method
  AlchemyServices.remoteMethod('getSentiment', {
    description: 'Returns the primary emotion of the supplied text',
    http: {
      path: '/getSentiment',
      verb: 'get'
    },
    accepts: [{
      arg: 'text',
      type: 'string',
      http: { source: 'query' },
      description: 'Text input for sentiment analysis',
      required: true
    }],
    returns: [{
      arg: 'sentimentScore',
      type: 'number',
      description: 'The sentiment score of the supplied text'
    }, {
      arg: 'sentimentType',
      type: 'string',
      description: 'The classified sentiment based on score (positive, negative, neutral)'
    }]
  });

  // Register the Remote Method
  AlchemyServices.remoteMethod('getEmotion', {
    description: 'Returns the primary emotion for the supplied text',
    http: {
      path: '/getEmotion',
      verb: 'get'
    },
    accepts: [{
      arg: 'text',
      type: 'string',
      http: { source: 'query' },
      description: 'Text input for emotion analysis',
      required: true
    }],
    returns: [{
      arg: 'primaryEmotion',
      type: 'string',
      description: 'The primary emotion of the supplied text'
    }, {
      arg: 'primaryEmotionScore',
      type: 'number',
      description: 'The confidence score for the primary emotion'
    }]
  });
};