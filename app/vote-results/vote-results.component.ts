import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { StateService } from '../shared/state.service';
import { RouteParams, Router } from '@angular/router-deprecated';

@Component({
  selector: 'vote-results',
  templateUrl: './app/vote-results/vote-results.component.html'
})

export class VoteResultsComponent implements OnInit {
  private userList : string = this.dataService.getUsersWhoVoted().join(', ');
  private eventList = this.dataService.getEventList();
  private maxVoteVal = this.dataService.getMaxVoteVal();
  private endResults : { "name" : string, "voteAvg" : number } [];

  ngOnInit () {
    let id = +this.routeParams.get('id');
    this.endResults = this.dataService.getAvgEventList(id);
  }

  constructor (
    private dataService : DataService,
    private stateService : StateService,
    private router : Router,
    private routeParams: RouteParams
  ) {};

  goToMain () {
    let link = ['EventList'];
    this.router.navigate(link);
  }
}
