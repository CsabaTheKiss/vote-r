import { Component } from '@angular/core';
import { StateService } from '../shared/state.service';
import { Router } from '@angular/router-deprecated';

@Component ({
  selector: 'vr-navigation',
  templateUrl: './app/navigation/navigation.component.html'
})

export class NavigationComponent {
  constructor (
    private stateService : StateService,
    private router : Router
  ) {}

  logOut() {
    this.stateService.logOut().then((data) => {
      if ( data ) {console.log("Successfully logged out", data); };
    });
  }

  navToCreateEvent() {
    this.router.navigate(['CreateEvent']);
  }
}
