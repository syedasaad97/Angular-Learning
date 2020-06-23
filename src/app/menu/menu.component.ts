import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../common/dish';
import {DishService} from '../services/dish.service';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
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
 