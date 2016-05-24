import { VREvent } from './event-type';
// import { WHO_VOTED } from './who-voted-mock';
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

////////  SPECS  /////////////

describe('The DataService', () => {

  beforeEachProviders ( () => [
    DataService
  ]);

  it('should exist',
    inject([DataService],
    (dataService: DataService) => {
    expect(dataService).toBeDefined();
  }));

  it('should have a getUsersWhoVoted function, which returns with a user list (array)',
    inject([DataService],
    (dataService: DataService) => {

    let users = dataService.getUsersWhoVoted(); // in case of asyn call?

    expect(users instanceof Array).toEqual(true);
  }));

  it('should have a getEventList function, which returns with a defined array value',
    inject([DataService],
    (dataService: DataService) => {

    let events = dataService.getEventList();

    expect(events instanceof Array).toEqual(true);
  }));

  describe('the saveVotes function', () => {

    it('should exist',
      inject([DataService],
      (dataService: DataService) => {
      expect(dataService.saveVotes).toBeDefined();
    }));

    let userName = "Jhon";
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

    it('should add the user to the usersWhoVoted private array',
      inject([DataService],
      (dataService: DataService) => {

      dataService.saveVotes(userName, votes);

      let users = dataService.getUsersWhoVoted();

      expect(users[users.length-1]).toEqual(userName);
    }));

    it('should recalculate the avg of the votes after new vote is saved',
      inject([DataService],
      (dataService: DataService) => {

      let avgVotesBefore = dataService.getAvgEventList();

      dataService.saveVotes(userName, votes);

      let avgVotesAfter = dataService.getAvgEventList();

      expect(avgVotesBefore[0].voteAvg).not.toEqual(avgVotesAfter[0].voteAvg);
    }));

  });

  it('should have a getAvgEventList function, which returns a defined array value',
    inject([DataService],
    (dataService: DataService) => {

    let events = dataService.getAvgEventList();

    expect(events instanceof Array).toEqual(true);
  }));

  describe('the getBlankVoteList function', () => {

    it('should exist',
      inject([DataService],
      (dataService: DataService) => {
      expect(dataService.getBlankVoteList).toBeDefined();
    }));

    it('should return a defined array value',
      inject([DataService],
      (dataService: DataService) => {

      let blankList = dataService.getBlankVoteList();

      expect(blankList instanceof Array).toEqual(true);
    }));

    it('should fill up the list in the constructor phase, so it should return with not an empty array',
      inject([DataService],
      (dataService: DataService) => {

      let blankList = dataService.getBlankVoteList();

      expect(blankList.length).toBeGreaterThan(0);
    }));

    it('should return an array, which has elements, that have a name property',
      inject([DataService],
      (dataService: DataService) => {

      let blankList = dataService.getBlankVoteList();

      expect(blankList[0].name).toBeDefined();
    }));

    it('should initalize the returned arrays elements name property well',
      inject([DataService],
      (dataService: DataService) => {

      let votes : { "name" : string, "vote" : number }[] =
      [
        { "name" : "Felcsut little train", "vote" : 0 },
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

      let blankList = dataService.getBlankVoteList();

      expect(blankList[0].name).toEqual(votes[0].name);
    }));

    it('should return an array, which has elements, that have a vote property',
      inject([DataService],
      (dataService: DataService) => {

      let blankList = dataService.getBlankVoteList();

      expect(blankList[0].vote).toBeDefined();
    }));

    it('should return with an array, whose elements vote property is set to 0 (zero)',
      inject([DataService],
      (dataService: DataService) => {

      let blankList = dataService.getBlankVoteList();

      expect(blankList[0].vote).toEqual(0);
    }));

  });

  it('should have a getMaxVoteVal function, which returns with a positive number',
    inject([DataService],
    (dataService: DataService) => {
    expect(dataService.getMaxVoteVal()).toBeGreaterThan(0);
  }));

  describe('The getAvgEventList function', () => {
    it('should exist', inject([DataService],
      (dataService: DataService) => {
      expect(dataService.getAvgEventList).toBeDefined();
    }));

    it('should return with an array', inject([DataService],
      (dataService: DataService) => {
      let avgEvents = dataService.getAvgEventList();
      expect(avgEvents instanceof Array).toBe(true);
    }));

    it('should return with an array, whose elements have name property', inject([DataService],
      (dataService: DataService) => {
      let avgEvents = dataService.getAvgEventList();
      expect(avgEvents[0].name).toBeDefined();
    }));

    it('should return with an array, whose elements have voteAvg property', inject([DataService],
      (dataService: DataService) => {
      let avgEvents = dataService.getAvgEventList();
      expect(avgEvents[0].voteAvg).toBeDefined();
    }));

  });

});
