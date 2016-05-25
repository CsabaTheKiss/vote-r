import { Component } from '@angular/core';
import { DataService } from './shared/data.service';
import { StateService } from './shared/state.service';
import  { InputFormComponent } from './input-form/input-form.component';
import { VotingInterfaceComponent } from './voting-interface/voting-interface.component';
import { EventListComponent } from './event-list/event-list.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    providers: [ DataService, StateService, ROUTER_PROVIDERS ],
    directives: [
      InputFormComponent,
      VotingInterfaceComponent,
      EventListComponent,
      ROUTER_DIRECTIVES
    ]
})

@RouteConfig([
  {
    path: '/vote/:id',
    name: 'VotingInterface',
    component: VotingInterfaceComponent
  },
  {
    path: '/eventlist',
    name: 'EventList',
    component: EventListComponent,
    useAsDefault: true
  }
])

export class AppComponent {
    constructor(private stateService : StateService) {};
}
