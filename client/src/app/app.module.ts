/**
* @Date:   2017-01-11T15:25:03-06:00
* @Last modified time: 2017-03-03T10:34:56-06:00
* @License: Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
  limitations under the License.

* @Copyright: Copyright 2016 IBM Corp. All Rights Reserved.
*/



import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap'
import { GeneralModule } from './general/general.module'

import { AppComponent } from './app.component'

import { OrchestratedConversationService } from './orchestrated-conversation.service'
import { AlchemyService } from './alchemy.service'
import {ComponentsHelper} from 'ng2-bootstrap/ng2-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GeneralModule,
    AlertModule
  ],
  providers: [
    OrchestratedConversationService,
    AlchemyService,
    {provide: ComponentsHelper, useClass: ComponentsHelper}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
