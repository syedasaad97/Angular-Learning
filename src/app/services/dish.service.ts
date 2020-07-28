import { Injectable } from '@angular/core';
import {Dish} from '../common/dish';
import {DISHES} from '../common/dishes';
import { Observable,of } from 'rxjs';
import { map ,catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../common/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient,private processHttpMsg : ProcessHTTPMsgService) { }

  getDishes():Observable<Dish[]>{
    // return new Promise(resolve=>{
    //   setTimeout(()=>resolve(DISHES),2000)
    // });

    // return of(DISHES).pipe(delay(2000));

    return this.http.get<Dish[]>(baseURL+'dishes')
    .pipe(catchError(this.processHttpMsg.handleError));
  }

  getDish(id: string): Observable<Dish> {
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    // });
    // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(1000));

    return this.http.get<Dish>(baseURL+'dishes/'+id)
    .pipe(catchError(this.processHttpMsg.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    // return  new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    // });
    // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(1000));

    return this.http.get<Dish[]>(baseURL+'dishes?featured=true').pipe(map(dishes=>Dish[0]))
    .pipe(catchError(this.processHttpMsg.handleError));
  }

  getDishIds(): Observable<String[] | any> {
    // return of(DISHES.map(dish => dish.id));

    return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id)))
    .pipe(catchError(error=>error));
  }

  putDish(dish:Dish):Observable<Dish>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
    .pipe(catchError(this.processHttpMsg.handleError));
  }
}
