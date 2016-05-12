import { Injectable } from '@angular/core';
import { EVENTS } from '../shared/events-mock';
import { WHO_VOTED } from '../shared/who-voted-mock';

@Injectable()
export class DataService {
  private usersWhoVoted = WHO_VOTED;
  private eventList = EVENTS;
  private eventAvgEventList : any[] = [];
  private blankVoteList : any [] = [];
  private maxVoteVal = 10; // set the max possbile vote points here

  constructor () {
    // NEED TO GET eventList FROM SERVER HERE
    this.updateAvgVotes();
    this.eventList.forEach( (elem, ind) => {
      this.blankVoteList.push( { "name" : elem.name, "vote" : 0 } );
    });
  };

  private updateAvgVotes () {
    this.eventAvgEventList = [];
    this.eventList.forEach( (elem, ind) => {
      let newElem = { "name" : elem.name, "voteAvg" : this.countAvg(elem.votes) };
      this.eventAvgEventList.push(newElem);
    });
  }

  private countAvg( numArray : number[] ) {
    let sum = numArray.reduce( (prev, curr) => {
      // the newly pushed numbers are handled like strings, need to cast curr
      return prev + (+curr);
    }, 0);
    // round to two digits
    return Math.round( ( sum / numArray.length ) * 100 ) / 100;
  }

  saveVotes(userName : string, votesArr : { "name" : string, "vote" : number }[] ) {
    this.usersWhoVoted.push(userName);
    // they are in the same order, no need to search by name
    for ( let i = 0; i < this.eventList.length; ++i ) {
      this.eventList[i].votes.push(votesArr[i].vote);
    }
    this.updateAvgVotes();
    console.log("a voting has ended: ", votesArr[0].vote);
    // NEED TO SAVE TO SERVER HERE - eventList property
  }

  getUserVoteStatus (userName : String) : Boolean {
    return ( this.usersWhoVoted.indexOf(userName) === -1 );
  }

  getUsersWhoVoted () : String [] {
    return this.usersWhoVoted;
  }

  getEventList () {
    return this.eventList;
  }

  getAvgEventList () {
    return this.eventAvgEventList;
  }

  getBlankVoteList () {
    return this.blankVoteList;
  }

  getMaxVoteVal () {
    return this.maxVoteVal;
  }
}
