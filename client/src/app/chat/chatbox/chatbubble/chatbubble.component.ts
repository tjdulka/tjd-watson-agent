/**
* @Date:   2016-12-15T20:37:25-06:00
* @Last modified time: 2017-03-03T10:33:55-06:00
* @License: Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
  limitations under the License.

* @Copyright: Copyright 2016 IBM Corp. All Rights Reserved.
*/



import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'wcga-chatbubble',
  templateUrl: './chatbubble.component.html',
  styleUrls: ['./chatbubble.component.css']
})
export class ChatbubbleComponent implements OnInit {
  @Input() message: string
  @Input() direction: string = 'to'
  @Input() type: string = 'text'
  @Input() enrichment: any

  constructor() {
  }
  ngOnInit() {
    this.direction = this.direction.toLowerCase() + '-watson'
  }

}
