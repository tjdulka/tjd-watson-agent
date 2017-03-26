/**
* @Date:   2017-01-11T15:25:03-06:00
* @Last modified time: 2017-03-03T10:34:28-06:00
* @License: Licensed under the Apache License, Version 2.0 (the "License");  you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and
  limitations under the License.

* @Copyright: Copyright 2016 IBM Corp. All Rights Reserved.
*/



import { Component, OnInit, OnChanges, Input } from '@angular/core'

@Component({
  selector: 'wcga-sentiment-chart',
  templateUrl: './sentiment-chart.component.html',
  styleUrls: ['./sentiment-chart.component.css']
})
export class SentimentChartComponent implements OnInit, OnChanges {

  @Input() sentimentData: Array<number>
  public lineChartData: Array<any>
  public lineChartLabels: Array<any>
  public lineChartOptions: any
  public lineChartColors: Array<any>
  public lineChartLegend: boolean
  public lineChartType: string

  constructor() { }

  ngOnInit() {
    this.lineChartData = [
      {data: [0], label: 'User Sentiment'}
    ]
    this.lineChartLabels = Array(this.lineChartData[0].data.length).fill('')
    this.lineChartOptions = {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Customer Sentiment'
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Sentiment Score'
          },
          ticks: {
            min: -100,
            max: 100
          }
        }],
        xAxes: [{
          ticks: {
            display: true,
            maxRotation: 0
          },
          gridLines: {
            display: false
          }
        }]
      }
    }
    this.lineChartColors = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ]
    this.lineChartLegend = false
    this.lineChartType = 'line'
  }
  ngOnChanges() {
    this.updateData()
  }

  updateData() {
    this.lineChartData = [
      {data: this.sentimentData, label: 'User Sentiment'}
    ]
    this.lineChartLabels = Array(this.lineChartData[0].data.length).fill('')
    this.lineChartLabels[this.lineChartLabels.length - 1] = 'Latest Message'
  }

}
