import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router-deprecated';

@Injectable()
export class StateService {
  userName : string = "";
  nameSended : Boolean = false;
  userMayVote : Boolean = false;
  voteEnded : Boolean = false;
  currentVotes : { "name" : string, "vote" : number } []; //= this.dataService.getBlankVoteList();

  constructor (
    private dataService: DataService,
    private router : Router
  ) {};

  toVotingState ( userName : string ) {
    this.userName = userName;
    this.nameSended = true;
    // using the value in the view aswell, that`s why I`m storing it in a var
    // this.userMayVote = this.dataService.getUserVoteStatus( this.userName );
  }

  toEndVotingState ( currentVotes : { "name" : string, "vote" : number } [], eventId : number ) {
    // this.voteEnded = true;
    this.dataService.saveVotes(this.userName, currentVotes, eventId);
    console.log("voting ended");
  }

  logOut () {
    return new Promise( resolve => {
      setTimeout( () => {
        console.log("Logging out...");
        this.userName = "";
        this.nameSended = false;
        this.router.navigate(["EventList"]);
        resolve(true);
      }, 1000)
    })
  }
}
