/* tslint:disable:no-unused-variable */
import { StateService } from '../shared/state.service';
import { DataService } from '../shared/data.service';
import { EventListComponent } from './event-list.component';
import { Router } from '@angular/router-deprecated';

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

class MockedStateService {
  private userName : string = "";
}

////////  SPECS  /////////////

describe('The eventListComponent', () => {

  // TODO: make the test cases DRY

  /*beforeEachProviders(() => [
    provide(DataService, {useClass: MockedDataService})
  ]);

  it('should exist', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

    return tcb.createAsync(EventListComponent).then(fixture => {
        expect(fixture.componentInstance instanceof EventListComponent).toBe(true);
    });
  }));*/

  /*it('should have an eventList property',
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      tcb
        .overrideProviders(EventListComponent, [provide(DataService, {useClass: MockedDataService})])
        .createAsync(EventListComponent).then(fixture => {
          expect(fixture.componentInstance.eventList).toBeDefined();
      });
  }));

  it('the eventList should be initalized',
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      tcb
        .overrideProviders(EventListComponent, [provide(DataService, {useClass: MockedDataService})])
        .createAsync(EventListComponent).then(fixture => {

        expect(fixture.componentInstance.eventList.length).toEqual(2);

      });
  }));

  it('the should generate li-s based on the eventList',
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      tcb
        .overrideProviders(EventListComponent, [provide(DataService, {useClass: MockedDataService})])
        .createAsync(EventListComponent).then(fixture => {

        // trigger component change detection - needed becouse of *ngFor generation
        fixture.detectChanges();

        let li = fixture.debugElement.query(By.css('.event-list > li')).nativeElement;

        expect(li.innerText).toEqual("Event 1");

      });
  }));
*/
});
