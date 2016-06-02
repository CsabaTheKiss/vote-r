import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';
import { DataService } from '../shared/data.service';
import { StateService } from '../shared/state.service';
import { Router } from '@angular/router-deprecated';

class minEventOptionValidator {
  static getCountVal(control: Control) {
    // returning true means a NOT valid input
    if ( control.value < 2 ) { return { "minEventOptionValidator" : true }
    }
    return null;
  }
}

@Component({
  selector: 'create-event',
  templateUrl: './app/create-event/create-event.component.html',
  directives: [FORM_DIRECTIVES]
})

export class CreateEventComponent implements OnInit{

  private newEvent : { "id": number, "name" : string, "events" : any[], "voted": number[] };
  private eventOptionName : string = "";
  private currEventOptionId : number;
  private eventName : string = "";
  private eventOptionCounter : number;
  private minNumOfEventOptions : number = 2;

  private newEventForm : ControlGroup;
  private eventOptionNameValidator : Control;
  private eventNameValidator: Control;
  private minEventOptionsValidator: Control;

  constructor(
    private builder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.eventNameValidator = new Control('', Validators.required);
    this.minEventOptionsValidator = new Control('', minEventOptionValidator.getCountVal);

    this.newEventForm = builder.group({
      eventName: this.eventNameValidator,
      eventOptionCounter: this.minEventOptionsValidator
    })
  }

  ngOnInit () { // need generateEventId function form DataService
    this.newEvent = { "id": 1000, "name" : "", "events": [], "voted": [] }
    this.currEventOptionId = 0;
    this.eventName = "";
    this.eventOptionName = "";
    this.eventOptionCounter = 0;
  }

  addEventOption(event: any) {
    // the type of an event in the events array:
    // { "id": number, "name": string, "votes": number [] }
    event.preventDefault();
    let votes : number[] = [];
    let newEventOption = { "id": this.currEventOptionId, "name": this.eventOptionName, "votes": votes };
    this.newEvent.events.push(newEventOption);
    ++this.currEventOptionId;
    ++this.eventOptionCounter;

    this.eventOptionName = "";
  }

  deleteEventOption (index : number) {
    this.newEvent.events.splice(index, 1);
    --this.eventOptionCounter;
  }

  saveNewEvent() {
    this.newEvent.id = this.dataService.getNextEventId();
    this.newEvent.name = this.eventName;
    this.dataService.saveNewEvent(this.newEvent).then( (data) => {
      if (data) {
        console.log("New event Successfully saved.");
      }
      this.router.navigate(['EventList']);
    });
  }

  goBack (event : any) {
    event.preventDefault();
    window.history.back();
  }
}
