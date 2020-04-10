import { Injectable } from '@angular/core';
import {Dish} from '../common/dish';
import {DISHES} from '../common/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDish():Dish[]{
    return DISHES;
  }
}
