/**
* @Date:   2017-01-11T15:25:03-06:00
* @Last modified time: 2017-03-03T10:34:31-06:00
* @License: Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
  limitations under the License.

* @Copyright: Copyright 2016 IBM Corp. All Rights Reserved.
*/



import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SentimentChartComponent } from './sentiment-chart/sentiment-chart.component'
import { ChartsModule } from 'ng2-charts/ng2-charts'

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    SentimentChartComponent
  ],
  declarations: [SentimentChartComponent]
})
export class ChatExtensionsModule { }
