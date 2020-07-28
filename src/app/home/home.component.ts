import { Component, OnInit } from '@angular/core';
import {Promotion} from '../common/promotion';
import {PromotionService} from '../services/promotion.service';
import {Dish} from '../common/dish';
import {DishService} from '../services/dish.service';
import {Leader} from '../common/leader';
import {LeaderService} from '../services/leader.service';
import { flyInOut ,expand} from '../animations/app.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish : Dish ;
  promotion : Promotion ;
  leader  : Leader;
  homeErr : string

  constructor(private promotionService : PromotionService , 
    private dishService : DishService,
    private leaderService : LeaderService) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe(dish=>this.dish=dish,errMsg=>this.homeErr =<any>errMsg);
    this.promotion = this.promotionService.getFeaturedPromotion();
    this.leader =  this.leaderService.getFeaturedLeader();

  }

}
