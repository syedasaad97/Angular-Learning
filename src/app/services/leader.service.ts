import { Injectable } from '@angular/core';
import { Leader } from '../common/leader';
import { LEADERS } from '../common/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaderList():Leader[]{
    return LEADERS;
  }

  getFeaturedLeader():Leader{
    return LEADERS.filter(leaders=>leaders.featured)[0];
  }

  constructor() { }
}
