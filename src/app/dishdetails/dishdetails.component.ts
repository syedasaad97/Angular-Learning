import { Component, OnInit ,ViewChild,Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../common/dish';
import {DishService} from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Comment} from '../common/comment';


@Component({
  selector: 'app-dishdetails',
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.scss']
})

export class DishdetailsComponent implements OnInit {

  constructor(private fb:FormBuilder,private dishService:DishService
    , private location : Location,
    private activatedRoute : ActivatedRoute,@Inject('BaseUrl') private baseURL) { this.createForm() }

  // @ViewChild('fform') commentForm;
    dish:Dish;
    dishIds: string[];
    prev: string;
    next: string;
    comment:Comment;
    commentForm:FormGroup;
    formErrors = {
      'authorName': '',
      'comment': '',
    };
    dishError : string;
    dishCopy : Dish;

    ngOnInit() {
      this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.activatedRoute.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish;this.dishCopy = dish; this.setPrevNext(dish.id); },errMes=>this.dishError=<any>errMes);
    }



    validationMessages = {
      'author': {
        'required':      'Author Name is required.',
        'minlength':     'Author Name must be at least 2 characters long.',
        'maxlength':     'Author Name cannot be more than 25 characters long.'
      },
      'comment': {
        'required':      'Comment is required.',
        'minlength':     'Comment must be at least 2 characters long.',
       
      },
     
    };



  createForm()
      {
        this.commentForm =this.fb.group({
          author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
          rating:5,
          comment:['',[Validators.required,Validators.minLength(2)]],
         
        })
        this.commentForm.valueChanges
        .subscribe(data=>this.onValueChanged(data));
        this.onValueChanged();
      };

onSubmit(){
      this.comment=this.commentForm.value;
      this.comment.date=new Date().toISOString();
      // this.dish.comments.push(this.comment);
      this.dishCopy.comments.push(this.comment);
      this.dishService.putDish(this.dishCopy).subscribe(dish =>{
        this.dish = dish; this.dishCopy = dish;
      },errMes=>{this.dish = null; this.dishCopy = null;this.dishError=<any>errMes});
      this.commentForm.reset(
        {
          author:'',
          comment:'',
          rating:5
        }

  );
  
}
onValueChanged(data?: any) {
  if (!this.commentForm) { return; }
  const form = this.commentForm;
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
  
}

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(){
    this.location.back();
  }

}
