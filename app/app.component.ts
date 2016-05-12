import {Component} from '@angular/core';
import  { InputFormComponent } from './input-form/input-form.component';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    directives: [InputFormComponent]
})
export class AppComponent { }
