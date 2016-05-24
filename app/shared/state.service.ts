import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';

@Injectable()
export class StateService {
  userName : string = "";
  nameSended : Boolean = false;
  userMayVote : Boolean = false;
  voteEnded : Boolean = false;
  currentVotes : { "name" : string, "vote" : number } [] = this.dataService.getBlankVoteList();

  constructor (private dataService: DataService) {};

  toVotingState ( userName : string ) {
    this.userName = userName;
    this.nameSended = true;
    // using the value in the view aswell, that`s why I`m storing it in a var
    this.userMayVote = this.dataService.getUserVoteStatus( this.userName );
  }

  toEndVotingState ( currentVotes : { "name" : string, "vote" : number } [] ) {
    this.voteEnded = true;
    this.dataService.saveVotes(this.userName, this.currentVotes);
  }
}
