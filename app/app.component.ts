import { Component } from '@angular/core';
import { DataService } from './shared/data.service';
import { StateService } from './shared/state.service';
import  { InputFormComponent } from './input-form/input-form.component';
import { VotingInterfaceComponent } from './voting-interface/voting-interface.component';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    providers: [ DataService, StateService ],
    directives: [
      InputFormComponent,
      VotingInterfaceComponent
    ]
})

export class AppComponent {
    constructor(private stateService : StateService) {};
}
