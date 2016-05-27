import { Component, Input, OnInit } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';
import { DataService } from '../shared/data.service';
import { StateService } from '../shared/state.service';
import { RouteParams, Router } from '@angular/router-deprecated';

class sumOfVotesValidator {
  static sumEquals(control: Control) {
    // returning true means a NOT valid input
    if ( control.value !== 10 ) { return { "sumOfVotesValidator" : true }
    }
    return null;
  }
}

@Component({
  selector: 'voting-interface',
  templateUrl: './app/voting-interface/voting-interface.component.html',
  directives: [ FORM_DIRECTIVES ]
})

export class VotingInterfaceComponent implements OnInit{

  private userList : string = this.dataService.getUsersWhoVoted().join(', ');
  // private eventList = this.dataService.getEventList();
  private eventList :  { "id": number, "name" : string, "events":
        { "id": number, "name": string, "votes": number [] } [] };
  private currentVotes : { "name" : string, "vote" : number } [];
  private maxVoteVal = this.dataService.getMaxVoteVal();
  private sumOfVotes = 0;
  private sumOfVotesControl: Control;
  private votingForm: ControlGroup;

  constructor(
    private router: Router,
    private stateService : StateService,
    private dataService : DataService,
    private routeParams: RouteParams,
    private builder : FormBuilder
  ) {
    this.sumOfVotesControl = new Control('',sumOfVotesValidator.sumEquals);

    this.votingForm = builder.group({
      sumOfVotesControl: this.sumOfVotesControl
    });
  };

  ngOnInit () {
    let id = +this.routeParams.get('id');
    this.dataService.getEvent(id)
      .then(eventList => {
        this.eventList = eventList;
        // initilazing blank vote page for voting - need to push it back for dataService
        let blankList : any = [];
        this.eventList.events.forEach((elem) => {
          let newElem = { "name" : elem.name, "vote" : 0 };
            blankList.push(newElem);
        });
        this.currentVotes = blankList;
      });
   };

  goBack(event : any) {
    // becouse plain button also submits form
    event.preventDefault();
    window.history.back();
  }

  sendVotes() {
    let eventId = +this.routeParams.get('id');
    this.stateService.toEndVotingState( this.currentVotes, eventId);
    let link = ['VoteResults', { id: eventId }];
    this.router.navigate(link);
  }

  // if any voter slider changes, we need to recalculate the sum of the votes
  voteChanged() {
    let sum = 0;
    for (let i = 0; i < this.currentVotes.length; ++i) {
      sum += +(this.currentVotes[i].vote);
    }
    this.sumOfVotes = sum;
  }
};
