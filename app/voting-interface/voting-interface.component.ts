import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { StateService } from '../shared/state.service';
import { VoteResultsComponent } from '../vote-results/vote-results.component';

@Component({
  selector: 'voting-interface',
  templateUrl: './app/voting-interface/voting-interface.component.html',
  directives: [ VoteResultsComponent ]
})

export class VotingInterfaceComponent {
  private userList : string = this.dataService.getUsersWhoVoted().join(', ');
  private eventList = this.dataService.getEventList();
  private eventAvgList = this.dataService.getAvgEventList();
  private currentVotes : { "name" : string, "vote" : number } [] = this.dataService.getBlankVoteList();
  private maxVoteVal = this.dataService.getMaxVoteVal();

  constructor(
    private stateService : StateService,
    private dataService : DataService
  ) {};

  sendVotes() {
    this.stateService.toEndVotingState( this.currentVotes );
    this.eventAvgList = this.dataService.getAvgEventList();
  }
};
