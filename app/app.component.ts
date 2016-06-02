import { Component } from '@angular/core';
import { DataService } from './shared/data.service';
import { StateService } from './shared/state.service';
import  { InputFormComponent } from './input-form/input-form.component';
import { VotingInterfaceComponent } from './voting-interface/voting-interface.component';
import { EventListComponent } from './event-list/event-list.component';
import { VoteResultsComponent } from './vote-results/vote-results.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    providers: [ DataService, StateService, ROUTER_PROVIDERS ],
    directives: [
      InputFormComponent,
      VotingInterfaceComponent,
      VoteResultsComponent,
      EventListComponent,
      NavigationComponent,
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
    path: '/results/:id',
    name: 'VoteResults',
    component: VoteResultsComponent
  },
  {
    path: '/eventlist',
    name: 'EventList',
    component: EventListComponent,
    useAsDefault: true
  },
  {
    path: '/createevent',
    name: 'CreateEvent',
    component: CreateEventComponent
  }
])

export class AppComponent {
    constructor(private stateService : StateService) {};
}
