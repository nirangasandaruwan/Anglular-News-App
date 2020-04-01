import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap,pluck, mergeMap ,filter, toArray, share} from 'rxjs/operators';
import {HttpParams, HttpClient} from '@angular/common/http';
import {ForecastData} from './forecast-data';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    }
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private url:string = 'https://api.openweathermap.org//data/2.5/forecast';

  constructor(private http: HttpClient) { }

  public getCurrentLocation() {

    return new Observable<Coordinates>((observer) => {

      window.navigator.geolocation.getCurrentPosition(
        (position) => {

          observer.next(position.coords);
          observer.complete();
          
        },
        (err) => {
          observer.error(err)
        }
      )


    });

  }


  public getForecast() : Observable<ForecastData[]> {

   

    return this.getCurrentLocation().pipe(

      map((coords) => {
        return new HttpParams()
         .set('lat',String(coords.latitude))
         .set('lon',String(coords.longitude))
         .set('units','metric')
         .set('appid','9461b09321d0a46480d52dba088b4bd3')
      }),
      switchMap(params => this.http.get<OpenWeatherResponse>(this.url,{params})),
      pluck('list'),
      mergeMap(value => of(...value)),
      filter((value,index) => index%8 == 0),
      map(value => {
        return {

          dateString: value.dt_txt,
          temp: value.main.temp

        };
      }),
      toArray(),
      share()
  );

}

}
