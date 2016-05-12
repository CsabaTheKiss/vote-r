/* tslint:disable:no-unused-variable */
import { InputFormComponent } from './input-form.component';

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

/// Delete this
/* xdescribe('Smoke test', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
}); */

describe('InputFormComponent with new', function () {
  it('should instantiate component', () => {
    expect(new InputFormComponent()).toBeDefined('Whoopie!');
  });
});

describe('InputFormComponent with TCB', function () {

  it('should instantiate component',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

    tcb.createAsync(InputFormComponent).then(fixture => {
      expect(fixture.componentInstance instanceof InputFormComponent).toBe(true, 'should create InputFormComponent');
    });
  })));

  it('should have expected "title" property, with preferred text',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      tcb.createAsync(InputFormComponent).then(fixture => {
      // fixture.detectChanges();  // would need to resolve a binding but we don't have a binding
      let title = fixture.componentInstance.title;
      expect(title).toEqual('Please enter your name:');
    });

  })));

  it('should have usersWhoVoted property',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      tcb.createAsync(InputFormComponent).then(fixture => {
      // fixture.detectChanges();  // would need to resolve a binding but we don't have a binding
      let voted = fixture.componentInstance.usersWhoVoted;
      expect(voted).toBeDefined();
    });

  })));

  describe('the sendName function', function() {
    it('should be defined',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        tcb.createAsync(InputFormComponent).then(fixture => {
        // fixture.detectChanges();  // would need to resolve a binding but we don't have a binding
        let sendName = fixture.componentInstance.sendName;
        expect(sendName).toBeDefined('It is defined, cheers!');
      });

    })));

    describe('should work properly', function() {
      it('should change the massage property, if the name is sended',
        async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

          tcb.createAsync(InputFormComponent).then(fixture => {
          // fixture.detectChanges();  // would need to resolve a binding but we don't have a binding
          fixture.componentInstance.name = 'Gabo';
          fixture.componentInstance.usersWhoVoted = [ 'Zeno', 'Mirjam', 'Kovasec' ];
          fixture.componentInstance.sendName();
          let message = fixture.componentInstance.message;
          expect(message).toEqual("You may vote as: " + fixture.componentInstance.name);

          fixture.componentInstance.name = 'Zeno';
          fixture.componentInstance.sendName();
          message = fixture.componentInstance.message;
          expect(message).toEqual("You voted already. You may check the current status of the voting though, "
            + fixture.componentInstance.name +
            ".");
        });

      })));
    });

  });
});
