/**
* @Date:   2017-01-11T15:25:03-06:00
* @Last modified time: 2017-03-03T10:34:04-06:00
* @License: Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
  limitations under the License.

* @Copyright: Copyright 2016 IBM Corp. All Rights Reserved.
*/



import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core'
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap'
import { OrchestratedConversationService } from '../../../orchestrated-conversation.service'
import { AlchemyService } from '../../../alchemy.service'
import { ChatMessage } from '../chat.message.class'

@Component({
  selector: 'wcga-watson-details',
  templateUrl: './watson-details.component.html',
  styleUrls: ['./watson-details.component.css']
})
export class WatsonDetailsComponent implements OnInit, OnChanges {
  @Input() context: any
  @Input() messages: Array<ChatMessage>
  @ViewChild(ModalDirective)
  private watsonDetails: ModalDirective
  private primaryEmotion: String
  private emotionConfidence: String
  private emotionScore: Number
  private sentimentScore: Number
  private sentiment: String
  public previousSentiment: Array<Number> = [0]

  constructor(private _conversationService: OrchestratedConversationService, private _alchemyService: AlchemyService) {
    _conversationService.watsonDetails$.subscribe(() => {
      this.showDetails()
    })
  }

  ngOnInit() {
    this.setValues()
  }

  ngOnChanges() {
    this.setValues()
    this.getSentiment()
    this.getEmotion()
  }

  showDetails() {
    this.watsonDetails.show()
  }

  setValues() {
    // Empty... leftover from original implementation
  }

  getSentiment() {
    let toSend = getPreviousMessages(this.messages, 2)
    this._alchemyService.getSentiment(toSend).subscribe((response) => {
      this.sentiment = response.sentimentType
      this.sentimentScore = Math.floor(response.sentimentScore * 100)

      let messageCount = 0
      for (let message of this.messages) {
        if (message.direction === 'to') {
          messageCount++
        }
      }
      if (this.previousSentiment.length <= messageCount) {
        this.previousSentiment = this.previousSentiment.slice(0)
        this.previousSentiment.push(this.sentimentScore)
      }
    })
  }

  getEmotion() {
    let toSend = getPreviousMessages(this.messages, 2)
    this._alchemyService.getEmotion(toSend).subscribe((response) => {
      this.primaryEmotion = response.primaryEmotion
      this.emotionScore = Math.floor(response.primaryEmotionScore * 100)
      if (this.emotionScore === 0) {
        this.emotionConfidence = ''
      } else if (this.emotionScore > 0 && this.emotionScore <= 40) {
        this.emotionConfidence = ', but I\'m not very confident in that assessment.'
      } else if (this.emotionScore > 40 && this.emotionScore <= 60) {
        this.emotionConfidence = ', and I\'m pretty confident in that assessment.'
      }  else if (this.emotionScore > 60 && this.emotionScore <= 80) {
        this.emotionConfidence = ', and I\'m confident in that assessment.'
      } else if (this.emotionScore > 80 && this.emotionScore <= 100) {
        this.emotionConfidence = ', and I\'m very confident in that assessment.'
      }
    })
  }

}

function getPreviousMessages (chatMessages = [], memory = 3) {
  let messages = chatMessages.slice(0)
  messages.reverse()
  let toSend = ''
  let counter = 0
  for (let message of messages) {
    if (message.direction === 'to') {
      if (counter === 0) {
        toSend += message.message
      } else {
        toSend += ' - ' + message.message
      }
      counter++
      // Only pay attention to the previous few messages
      if (counter === memory) {
        break
      }
    }
  }
  return toSend
}
