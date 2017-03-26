/**
* @Date:   2017-01-11T15:25:03-06:00
* @Last modified time: 2017-03-03T10:34:12-06:00
* @License: Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
  limitations under the License.

* @Copyright: Copyright 2016 IBM Corp. All Rights Reserved.
*/



/* global $:false */
import { Component, OnInit } from '@angular/core'
import { ChatMessage } from './chat.message.class'
import { OrchestratedConversationService } from '../../orchestrated-conversation.service'
import { scrollToBottomOfChat } from '../util/util'

@Component({
  selector: 'wcga-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})

export class ChatboxComponent implements OnInit {
  messages: Array<ChatMessage> = []
  context: any = {}
  constructor(private _conversationService: OrchestratedConversationService) {
    _conversationService.externalMessage$.subscribe(message => {
    })
  }

  ngOnInit(): void {
    this.postMessage('', true)
  }

  postMessage(message: string, externalMessage = false): void {
    if (!externalMessage) {
      this.messages.push(new ChatMessage(message, 'to', 'text', false, {}))
    }
    this.messages.push(new ChatMessage('...', 'from', 'text', true, {}))
    scrollToBottomOfChat()
    this._conversationService.sendMessage(message, this.context).subscribe(response => {
      try {
        let messageArray: Array<string> = response.message.output.text
        for (message of messageArray) {
          this.messages.push(new ChatMessage(message, 'from', 'text', false, {}))
        }
      } catch (e) {
        // Fallback and just show the preformatted response
        this.messages.push(new ChatMessage(response.text, 'from', 'text', false, {}))
      }
      this.showEnrichment(response)
      this.context = response.message.context
      this.clearPending()
      scrollToBottomOfChat()
    }, error => console.log(error))
  }

  clearPending(): void {
    let cleanMessages = []
    for (let message of this.messages) {
      if (message.pending === false) {
        cleanMessages.push(message)
      }
    }
    this.messages = cleanMessages
  }

  showEnrichment(incomingResponse: any): void {
    // This is where custom enrichments would be handled
  }
}
