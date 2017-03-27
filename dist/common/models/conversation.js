/**
* @Date:   2017-01-11T15:25:03-06:00
* @Last modified time: 2017-03-03T10:35:17-06:00
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

module.exports = function (Conversation) {
  Conversation.disableRemoteMethod('invoke', true);
  Conversation.orchestratedMessage = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, body, cb) {
      var enrichment, message, retText, enrichmentName, context, input;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // let baseUrl = getBaseUrl(req)
              enrichment = {};
              message = {};
              retText = '';
              enrichmentName = '';
              _context.prev = 4;
              context = body.context;
              input = body.input;

              /** Get a response from conversation */

              _context.next = 9;
              return (0, _api.genericRequestPromise)({
                url: process.env.CONVERSATION_API_URL,
                headers: {
                  'accept': 'application/json',
                  'content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                  input: {
                    text: input.text
                  },
                  context: context
                })
              });

            case 9:
              message = _context.sent;


              retText = message.output.text.join('\n');
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](4);

              console.log(_context.t0);
              throw _context.t0;

            case 17:
              return _context.abrupt('return', [message, enrichment, retText, enrichmentName]);

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 13]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
  // Register the Remote Method
  Conversation.remoteMethod('orchestratedMessage', {
    description: 'Pass the results of the Watson Conversation through additional APIs',
    http: {
      path: '/orchestratedMessage',
      verb: 'post'
    },
    accepts: [{
      arg: 'req',
      type: 'object',
      http: { source: 'req' },
      description: 'Express Request'
    }, {
      arg: 'body',
      type: 'Conversation',
      http: { source: 'body' },
      description: 'Input to supply to Watson Conversation',
      required: true
    }],
    returns: [{
      arg: 'message',
      type: 'object',
      description: 'The original message returned from Watson Conversation'
    }, {
      arg: 'enrichment',
      type: 'object',
      description: 'The raw response from the extra enrichment, if any'

    }, {
      arg: 'text',
      type: 'string',
      description: 'The text to return to the user, after all enrichments have been applied'
    }, {
      arg: 'enrichmentName',
      type: 'string',
      description: 'The name of the enrichment performed, if any'
    }]
  });
};