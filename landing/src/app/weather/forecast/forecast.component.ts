import { Component, OnInit } from '@angular/core';
import { ForecastService } from './forecast.service';
import {ForecastData} from './forecast-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  forecastData$: Observable<ForecastData[]>;
 

  constructor(forecastService : ForecastService) { 

    this.forecastData$ = forecastService.getForecast();

      

  }

  ngOnInit(): void {
  }

}
