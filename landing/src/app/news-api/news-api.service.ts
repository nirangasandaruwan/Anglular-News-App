import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, switchMap, tap, pluck } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

interface NewsApiResponse {
  totalResults : number;
  articles: Article[]
}

export interface Article{
  title: string;
  url : string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {


  private url: string ='https://newsapi.org/v2/top-headlines';
  private pageSize: number = 10;
  private apiKey = 'f8ea3b766d0b4e72b3c5675876a0e6f8';
  private country = 'us';

  private pagesInput : Subject<number>;
  pagesOutput : Observable<Article[]>;
  numberOfPages: Subject<number>;



  constructor(private http: HttpClient) {

    this.numberOfPages = new Subject();

    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
         return new HttpParams()
         .set('apiKey',this.apiKey)
         .set('country',this.country)
         .set('pageSize',String(this.pageSize))
         .set('page', String(page));
      }),
      switchMap((params) => {
        return this.http.get<NewsApiResponse>(this.url,{params});
      }),
      tap(response => {
        const totalPages = Math.ceil(response.totalResults / this.pageSize);
        this.numberOfPages.next(totalPages);
      }),
      pluck('articles')
    );
    

   }




   getPage(page: number) {
     this.pagesInput.next(page)
   }



}
