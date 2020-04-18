import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../common/dish';
import {DishService} from '../services/dish.service';

@Component({
  selector: 'app-dishdetails',
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.scss']
})

export class DishdetailsComponent implements OnInit {

    dish:Dish;

  constructor(private dishService:DishService
    , private location : Location,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params);
    let id = this.activatedRoute.snapshot.params['id'];
    this.dishService.getDish(id).then(dish=>this.dish=dish);
  }

  goBack(){
    this.location.back();
  }

}
