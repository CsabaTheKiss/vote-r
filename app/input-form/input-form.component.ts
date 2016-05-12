import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
    selector: 'input-form',
    templateUrl: './app/input-form/input-form.component.html',
    providers: [DataService]
})

export class InputFormComponent {
  title = 'Please enter your name:';
  private userName : string
  private nameSended = false;
  private message : String;
  private eventList = this.dataService.getEventList();
  private eventAvgList = this.dataService.getAvgEventList();
  private currentVotes : { "name" : string, "vote" : number } [] = this.dataService.getBlankVoteList();
  private maxVoteVal = this.dataService.getMaxVoteVal();
  private userMayVote : Boolean = false;
  private userList : string = '';

  // store states in service?
  private voteEnded = false;

  constructor(private dataService: DataService) {
    this.updateUsersWhoVoted();
  };

  sendName() {
    // Chrome reloads page when this fuction is called (something related to nameSended)
    this.nameSended = true;
    // using the value in the view aswell, that`s why I`m storing it in a var
    this.userMayVote = this.dataService.getUserVoteStatus( this.userName );
    this.message = this.updateMessage();
    this.title = 'List of events';
  }

  sendVotes() {
    this.title = 'Thanks for voting!';
    this.message = 'You voted as: ' + this.userName;
    this.dataService.saveVotes(this.userName, this.currentVotes);
    this.updateUsersWhoVoted();
    this.voteEnded = true;
    this.eventAvgList = this.dataService.getAvgEventList();
  }

  updateUsersWhoVoted () {
    this.userList = this.dataService.getUsersWhoVoted().join(', ');
  }

  private updateMessage() {
    if ( this.userMayVote ) {
      return "You may vote as: " + this.userName;
    } else {
      return "You voted already, " + this.userName + "! You may check the current status of the voting though.";
    }
  }

}
