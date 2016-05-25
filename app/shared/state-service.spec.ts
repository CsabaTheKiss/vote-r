/* tslint:disable:no-unused-variable */
import { StateService } from './state.service';
import { DataService } from './data.service';

import {
  expect, it, iit, xit,
  describe, ddescribe, xdescribe,
  beforeEach, beforeEachProviders, withProviders,
  async, inject
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';

import { By }             from '@angular/platform-browser';
import { provide }        from '@angular/core';
import { ViewMetadata }   from '@angular/core';
import { PromiseWrapper } from '@angular/core/src/facade/promise';

import { Injectable } from '@angular/core';

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
/*
describe('The StateService', () => {

  beforeEachProviders(() => [
    StateService,
    // syntax used for mocking out dependencies
    provide(DataService, {useClass: MockedDataService})
  ]);

  it('should exist',
    inject([StateService, DataService],
    (stateService: StateService, dataService: DataService) => {
    expect(stateService).toBeDefined();
  }));

  it('should have a userName property, with an empty string initial value',
    inject([StateService, DataService],
    (stateService: StateService, dataService: DataService) => {
    expect(stateService.userName).toEqual("");
  }));

  it('should have a userMayVote property, with a false initial value',
    inject([StateService, DataService],
    (stateService: StateService, dataService: DataService) => {
    expect(stateService.userMayVote).toEqual(false);
  }));

  it('should have a voteEnded property, with a false initial value',
    inject([StateService, DataService],
    (stateService: StateService, dataService: DataService) => {
    expect(stateService.voteEnded).toEqual(false);
  }));

  it('should have a currentVotes property, with an initial value',
    inject([StateService, DataService],
    (stateService: StateService, dataService: DataService) => {
    expect(stateService.currentVotes).toBeDefined();
  }));

  describe('The toVotingState function', () => {
    it('should exist',
      inject([StateService, DataService],
      (stateService: StateService, dataService: DataService) => {
      expect(stateService.toVotingState).toBeDefined();
    }));

    it('should set the userName property, when it is called with a proper argument',
      inject([StateService, DataService],
      (stateService: StateService, dataService: DataService) => {

      let userName : string = "Paul";

      stateService.toVotingState(userName);

      expect(stateService.userName).toEqual("Paul");
    }));

    it('should set the nameSended property to true, when it is called with a proper argument',
      inject([StateService, DataService],
      (stateService: StateService, dataService: DataService) => {

      let userName : string = "Paul";
      spyOn(dataService, 'getUserVoteStatus');
      stateService.toVotingState(userName);

      expect(stateService.nameSended).toEqual(true);
    }));

    it('should call getUserVoteStatus from dataService, when it is called with a proper argument',
      inject([StateService, DataService],
      (stateService: StateService, dataService: DataService) => {

      let userName : string = "Paul";
      spyOn(dataService, 'getUserVoteStatus');
      stateService.toVotingState(userName);

      expect(dataService.getUserVoteStatus).toHaveBeenCalled();
    }));
  });

  describe('The toEndVotingState function', () => {
    it('should exist',
      inject([StateService, DataService],
      (stateService: StateService, dataService: DataService) => {
      expect(stateService.toEndVotingState).toBeDefined();
    }));

    it('should set the voteEnded property, when it is called with a proper argument',
      inject([StateService, DataService],
      (stateService: StateService, dataService: DataService) => {

      let userName : string = "Paul";
      let voteMock : { "name" : string, "vote" : number } [] = [ { "name" : "Stuff", "vote" : 6 } ]

      stateService.toEndVotingState(voteMock);

      expect(stateService.voteEnded).toEqual(true);
    }));

    it('should call getUserVoteStatus from dataService, when it is called with a proper argument',
      inject([StateService, DataService],
      (stateService: StateService, dataService: DataService) => {

      let userName : string = "Paul";
      let voteMock : { "name" : string, "vote" : number } [] = [ { "name" : "Stuff", "vote" : 6 } ]

      spyOn(dataService, 'saveVotes');
      stateService.toEndVotingState(voteMock);

      expect(dataService.saveVotes).toHaveBeenCalled();
    }));
  });

});
*/
