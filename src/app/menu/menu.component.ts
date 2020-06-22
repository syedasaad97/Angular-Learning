import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../common/dish';
import {DishService} from '../services/dish.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes:Dish[] ;
  errorMsg : string;

  // selectedDish : Dish ;

  constructor(private dishService:DishService,@Inject('BaseUrl') private baseURL) {   }

  ngOnInit() {
    this.dishService.getDishes().subscribe(
      dishes=>this.dishes=dishes,errMsg=>this.errorMsg =<any>errMsg);
  }
  // selectDish(dish:Dish){
  //   this.selectedDish = dish;
  
  // }
}
 