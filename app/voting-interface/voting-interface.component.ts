import { Component } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';
import { DataService } from '../shared/data.service';
import { StateService } from '../shared/state.service';
import { VoteResultsComponent } from '../vote-results/vote-results.component';

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

export class VotingInterfaceComponent {
  private userList : string = this.dataService.getUsersWhoVoted().join(', ');
  private eventList = this.dataService.getEventList();
  private eventAvgList = this.dataService.getAvgEventList();
  private currentVotes : { "name" : string, "vote" : number } [] = this.dataService.getBlankVoteList();
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
    private builder : FormBuilder
  ) {
    this.sumOfVotesControl = new Control('',sumOfVotesValidator.sumEquals);

    this.votingForm = builder.group({
      sumOfVotesControl: this.sumOfVotesControl
    });
  };

  sendVotes() {
    this.stateService.toEndVotingState( this.currentVotes );
    this.eventAvgList = this.dataService.getAvgEventList();
  }

  voteChanged() {
    let sum = 0;
    for (let i = 0; i < this.currentVotes.length; ++i) {
      sum += +(this.currentVotes[i].vote);
    }
    this.sumOfVotes = sum;
  }
};
