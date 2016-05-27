import { Injectable } from '@angular/core';
import { EVENTS } from '../shared/events-mock';
import { WHO_VOTED } from '../shared/who-voted-mock';

@Injectable()
export class DataService {
  private usersWhoVoted = WHO_VOTED;
  private eventList = EVENTS;
  private eventAvgEventList : { "name" : string, "voteAvg" : number } [] = [];
  private blankVoteList : any [] = [];
  private maxVoteVal = 10; // set the max possbile vote points here

  constructor () {
    // NEED TO GET eventList FROM SERVER HERE
    // this.updateAvgVotes();
    // create the blank list, when an event is choosen
    /*this.eventList.forEach( (elem, ind) => {
      this.blankVoteList.push( { "name" : elem.name, "vote" : 0 } );
    });*/
  };

  getEvent(id : number) {
    return Promise.resolve(EVENTS).then(
      events => events.filter(event => event.id === id)[0]
    );
  }

  private updateAvgVotes (eventId : number) {
    this.eventAvgEventList = [];
    this.eventList.forEach( (elem) => {
      if ( elem.id === eventId ) {
        elem.events.forEach( (event) =>  {
          let newElem = { "name" : event.name, "voteAvg" : this.countAvg(event.votes) };
          this.eventAvgEventList.push(newElem);
        });
      }
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

  saveVotes(userName : string, votesArr : { "name" : string, "vote" : number }[], eventId: number ) {
    for ( let i = 0; i < this.eventList.length; ++i ) {
      if ( this.eventList[i].id === eventId ) {
        this.eventList[i].voted.push(userName);
        // events in votesArr and in the eventList are in the same order, no need to search by name
        for ( let j = 0; j < this.eventList[i].events.length; ++j ) {
          this.eventList[i].events[j].votes.push(votesArr[j].vote);
        }
      }
    }
    this.updateAvgVotes(eventId);
    // NEED TO SAVE TO SERVER HERE - eventList property
  }

  getUserVoteStatus (userName : string, eventId: number) : Boolean {
    for ( let i = 0; i < this.eventList.length; ++i ) {
      if ( this.eventList[i].id === eventId ) {
        return ( this.eventList[i].voted.indexOf(userName) === -1 );
      }
    }
    return null;
  }

  getUsersWhoVoted (eventId: number) : String [] {
    for ( let i = 0; i < this.eventList.length; ++i ) {
      if ( this.eventList[i].id === eventId ) {
        return ( this.eventList[i].voted);
      }
    }
    return [];
  }

  getEventList () {
    return this.eventList;
  }

  getBlankVoteList (id : number) {

  }

  getAvgEventList (eventId: number) {
    this.updateAvgVotes(eventId);
    return this.eventAvgEventList;
  }

  getMaxVoteVal () {
    return this.maxVoteVal;
  }
}
