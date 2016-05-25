import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { StateService } from '../shared/state.service';
import { Router } from '@angular/router-deprecated';
// import { VoteResultsComponent } from '../vote-results/vote-results.component';

@Component ({
  selector: 'event-list',
  templateUrl: './app/event-list/event-list.component.html'
})

export class EventListComponent {
  eventList = this.dataService.getEventList();

  constructor (
    // private stateService : StateService,
    private router: Router,
    private dataService : DataService
  ) {}

  gotoDetail (event : any) {
    let link = ['VotingInterface',  { id: event.id } ];
    this.router.navigate(link);
  }
}
