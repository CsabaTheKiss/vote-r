import { Component, Input } from '@angular/core';
import { DataService } from '../shared/data.service';
import { StateService } from '../shared/state.service';

@Component({
  selector: 'vote-results',
  templateUrl: './app/vote-results/vote-results.component.html'
})

export class VoteResultsComponent {
  private userList : string = this.dataService.getUsersWhoVoted().join(', ');
  private eventList = this.dataService.getEventList();
  private maxVoteVal = this.dataService.getMaxVoteVal();
  @Input() endResults : { "name" : string, "voteAvg" : number };

  constructor (
    private dataService : DataService,
    private stateService : StateService
  ) {};
}
