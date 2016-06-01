import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { StateService } from '../shared/state.service';
import { Router } from '@angular/router-deprecated';

@Component ({
  selector: 'event-list',
  templateUrl: './app/event-list/event-list.component.html'
})

export class EventListComponent {
  eventList = this.dataService.getEventList();

  constructor (
    private stateService : StateService,
    private router: Router,
    private dataService : DataService
  ) {}

  gotoDetail (eventId : number) {
    let userName = this.stateService.userName;
    let userMayVote = this.dataService.getUserVoteStatus(userName, eventId);
    let link : any;
    if ( userMayVote ) {
      link = ['VotingInterface',  { id: eventId } ];
    } else {
      link = ['VoteResults',  { id: eventId } ];
    }
    this.router.navigate(link);
  }

  logOut() {
    this.stateService.logOut().then((data) => {
      if ( data ) {console.log("Successfully logged out", data); };
    });
  }

  navToCreateEvent() {
    this.router.navigate(['CreateEvent']);
  }
}
