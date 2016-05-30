/* tslint:disable:no-unused-variable */
import { StateService } from '../shared/state.service';
import { DataService } from '../shared/data.service';
import { VotingInterfaceComponent } from './voting-interface.component';
import { RouteParams, Router, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import {
  expect, it, iit, xit,
  describe, ddescribe, xdescribe,
  beforeEach, beforeEachProviders, withProviders,
  async, inject, injectAsync
} from '@angular/core/testing';

import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';

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
  var builder : TestComponentBuilder;

  beforeEachProviders(() => [
    // class mocking dosen't work: if no mocking is used, then it works...WTF?!
    // source used for mocking:
    // https://docs.google.com/presentation/d/1UkuJgBaOAjDMYiMBLT38LEWMzh6sW_iliTPF1PHnmzY/edit?pref=2&pli=1#slide=id.gbee18c13d_0_266
    // provide(DataService, { useClass: MockedDataService }),
    DataService,
    StateService
  ]);

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    builder = tcb;
  }));

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

  it('should exist', async(() => {
    builder.createAsync(VotingInterfaceComponent).then((fixture: ComponentFixture<VotingInterfaceComponent>) => {
      expect(fixture.componentInstance instanceof VotingInterfaceComponent).toBe(true);
    });
  }));

});
