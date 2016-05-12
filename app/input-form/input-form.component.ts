import { Component } from '@angular/core';
import { StateService } from '../shared/state.service';

@Component({
    selector: 'input-form',
    templateUrl: './app/input-form/input-form.component.html',
})

export class InputFormComponent {
  private userName : string;
  private message : string;

  constructor(
    private stateService : StateService
  ) {};

  sendName() {
    // Chrome reloads page when this fuction is called (something related to nameSended)
    this.stateService.toVotingState(this.userName);
  }
}
