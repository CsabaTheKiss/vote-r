import { Component, Input, OnInit } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';
import { DataService } from '../shared/data.service';
import { StateService } from '../shared/state.service';
import { VoteResultsComponent } from '../vote-results/vote-results.component';
import { RouteParams } from '@angular/router-deprecated';

/* interface ValidationResult {
 [key:string]:boolean;
} */

class sumOfVotesValidator {
  static sumEquals(control: Control) {
    // returning true means NOT valid input
    if ( control.value !== 10 ) { return { "sumOfVotesValidator" : true }
    }
    return null;
  }
}

@Component({
  selector: 'voting-interface',
  templateUrl: './app/voting-interface/voting-interface.component.html',
  directives: [ VoteResultsComponent, FORM_DIRECTIVES ]
})

export class VotingInterfaceComponent implements OnInit{

  private userList : string = this.dataService.getUsersWhoVoted().join(', ');
  // private eventList = this.dataService.getEventList();
  private eventList :  { "id": number, "name" : string, "events":
        { "id": number, "name": string, "votes": number [] } [] };
  private eventAvgList = this.dataService.getAvgEventList(+this.routeParams.get('id'));
  private currentVotes : { "name" : string, "vote" : number } [];
  private maxVoteVal = this.dataService.getMaxVoteVal();
  private sumOfVotes = 0;
  private sumOfVotesControl: Control;
  private votingForm: ControlGroup;
  // sum votes: an array made of integers - bind them with the sliders
  // on change event: re-calculate the sum, and check its value
  // to make use of angular form validation: read-only (?) input field that contains the sum of vote points
  // based on that make form validation? seems legit...

  constructor(
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
    console.log("sending votes...");
    this.stateService.toEndVotingState( this.currentVotes, +this.routeParams.get('id'));
    this.eventAvgList = this.dataService.getAvgEventList(+this.routeParams.get('id'));
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
