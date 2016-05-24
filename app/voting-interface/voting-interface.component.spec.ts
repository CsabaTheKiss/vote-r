/* tslint:disable:no-unused-variable */
import { StateService } from '../shared/state.service';
import { DataService } from '../shared/data.service';
import { VotingInterfaceComponent } from './voting-interface.component';

import {
  expect, it, iit, xit,
  describe, ddescribe, xdescribe,
  beforeEach, beforeEachProviders, withProviders,
  async, inject, injectAsync
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';

import { By }             from '@angular/platform-browser';
import { provide }        from '@angular/core';
import { ViewMetadata }   from '@angular/core';
import { PromiseWrapper } from '@angular/core/src/facade/promise';

class MockedDataService {
  // private usersWhoVoted = WHO_VOTED;
  // private eventList = EVENTS;
  private eventAvgEventList : any[] = [];
  private blankVoteList : any [] = [];
  private maxVoteVal = 10; // set the max possbile vote points here

  constructor () { };

  getUserVoteStatus (userName : String) : Boolean {
    // return ( this.usersWhoVoted.indexOf(userName) === -1 );
    return true;
  }

  saveVotes(userName : string, votesArr : { "name" : string, "vote" : number }[] ) {

  }

  getBlankVoteList () : any[] {
    return [];
  }
}

////////  SPECS  /////////////

describe('The voting interface component', () => {

  beforeEachProviders(() => [
    StateService,
    //provide(DataService, { useClass: MockedDataService })
    DataService
  ]);

  let votes : { "name" : string, "vote" : number }[] =
  [
    { "name" : "Felcsut little train", "vote" : 5 },
    { "name" : "Lasertag", "vote" : 5 },
    { "name" : "Paintball", "vote" : 5 },
    { "name" : "Pool/Billiard", "vote" : 5 },
    { "name" : "Dinner", "vote" : 5 },
    { "name" : "Drinking", "vote" : 5 },
    { "name" : "Sumo", "vote" : 5 },
    { "name" : "Deathmatch", "vote" : 5 },
    { "name" : "Tour in to another dimension", "vote" : 5 },
    { "name" : "Visiting Gandalf, and Magneto", "vote" : 5 }
  ];

  it('should render list',
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb
          //.overrideProviders(VotingInterfaceComponent, [provide(DataService, {useClass: MockedDataService}), StateService])
          .createAsync(VotingInterfaceComponent)
          .then((componentFixture) => {
      // const element = componentFixture.nativeElement;

    });
  }));

});
