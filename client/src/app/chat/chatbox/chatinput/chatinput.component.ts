/**
* @Date:   2016-12-15T20:37:11-06:00
* @Last modified time: 2017-03-03T10:33:59-06:00
* @License: Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
  limitations under the License.

* @Copyright: Copyright 2016 IBM Corp. All Rights Reserved.
*/



import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core'

@Component({
  selector: 'wcga-chatinput',
  templateUrl: './chatinput.component.html',
  styleUrls: ['./chatinput.component.css']
})
export class ChatinputComponent implements OnInit, AfterViewInit {
  public text: string = ''
  @Output() sendMessage = new EventEmitter<string>()
  constructor() { }

  ngOnInit() {
  }

  emitKeyPress(e) {
    if (e.code === 'Enter' || e.code === 'enter') {
      this.emitSendMessage()
    }
  }

  emitSendMessage() {
    this.sendMessage.emit(this.text)
    this.text = ''
    document.getElementById('chat-input').focus()
  }

  ngAfterViewInit() {
    document.getElementById('chat-input').focus()
  }


}
