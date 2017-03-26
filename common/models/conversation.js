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



'use strict'

import {genericRequestPromise} from '../util/api'

module.exports = function (Conversation) {
  Conversation.disableRemoteMethod('invoke', true)
  Conversation.orchestratedMessage = async function (req, body, cb) {
    // let baseUrl = getBaseUrl(req)
    let enrichment = {}
    let message = {}
    let retText = ''
    let enrichmentName = ''
    try {
      let context = body.context
      let input = body.input

      /** Get a response from conversation */
      message = await genericRequestPromise({
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
      })

      retText = message.output.text.join('\n')
    } catch (e) {
      console.log(e)
      throw (e)
    }
    return [message, enrichment, retText, enrichmentName]
  }
  // Register the Remote Method
  Conversation.remoteMethod(
    'orchestratedMessage', {
      description: 'Pass the results of the Watson Conversation through additional APIs',
      http: {
        path: '/orchestratedMessage',
        verb: 'post'
      },
      accepts: [
        {
          arg: 'req',
          type: 'object',
          http: {source: 'req'},
          description: 'Express Request'
        },
        {
          arg: 'body',
          type: 'Conversation',
          http: {source: 'body'},
          description: 'Input to supply to Watson Conversation',
          required: true
        }
      ],
      returns: [
        {
          arg: 'message',
          type: 'object',
          description: 'The original message returned from Watson Conversation'
        },
        {
          arg: 'enrichment',
          type: 'object',
          description: 'The raw response from the extra enrichment, if any'

        },
        {
          arg: 'text',
          type: 'string',
          description: 'The text to return to the user, after all enrichments have been applied'
        },
        {
          arg: 'enrichmentName',
          type: 'string',
          description: 'The name of the enrichment performed, if any'
        }
      ]
    }
  )
}
