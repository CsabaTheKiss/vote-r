/* tslint:disable:no-unused-variable */
import { StateService } from '../shared/state.service';
import { DataService } from '../shared/data.service';
import { CreateEventComponent } from './create-event.component';
import { Router } from '@angular/router-deprecated';

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
  private EVENTS =
  [
    { "id": 1, "name" : "Event 1", "events":
      [
        { "id": 11, "name": "Felcsut little train", "votes": [ 0, 0, 0 ] },
        { "id": 12, "name": "Lasertag", "votes": [ 0, 6, 0 ] },
        { "id": 13, "name": "Paintball", "votes": [ 0, 0, 10 ] },
      ]
    },
    { "id": 2, "name" : "Event 2", "events":
        [
          { "id": 11, "name": "Felcsut little train", "votes": [ 0, 0, 0 ] },
          { "id": 12, "name": "Lasertag", "votes": [ 0, 6, 0 ] },
          { "id": 13, "name": "Paintball", "votes": [ 0, 0, 10 ] },
        ]
    }
  ];
  private eventList = this.EVENTS;
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

  getEventList () {
    return this.eventList;
  }
}

////////  SPECS  /////////////

describe('The CreateEventComponent', () => {

  var builder : TestComponentBuilder;

  beforeEachProviders(() => [
    // class mocking dosen't work: if no mocking is used, then it works...WTF?!
    // source used for mocking:
    // https://docs.google.com/presentation/d/1UkuJgBaOAjDMYiMBLT38LEWMzh6sW_iliTPF1PHnmzY/edit?pref=2&pli=1#slide=id.gbee18c13d_0_266
    //provide(DataService, { useClass: MockedDataService }),
    DataService,
    StateService
  ]);

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    builder = tcb;
  }));

  xit('should exist', async(() => {
    builder.createAsync(CreateEventComponent).then((fixture: ComponentFixture<CreateEventComponent>) => {
      expect(fixture.componentInstance instanceof CreateEventComponent).toBe(true);
    });
  }));

})
