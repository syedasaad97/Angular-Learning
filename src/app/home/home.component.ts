import { Component, OnInit } from '@angular/core';
import {Promotion} from '../common/promotion';
import {PromotionService} from '../services/promotion.service';
import {Dish} from '../common/dish';
import {DishService} from '../services/dish.service';
import {Leader} from '../common/leader';
import {LeaderService} from '../services/leader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish : Dish ;
  promotion : Promotion ;
  leader  : Leader;

  constructor(private promotionService : PromotionService , 
    private dishService : DishService,
    private leaderService : LeaderService) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().then(dish=>this.dish=dish);
    this.promotion = this.promotionService.getFeaturedPromotion();
    this.leader =  this.leaderService.getFeaturedLeader();

  }

}
