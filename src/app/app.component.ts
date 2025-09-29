import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-template-driven-form';
  @ViewChild('registrationForm') form: NgForm;

  genders = [
    {    id: 'check-male',    value: 'male', display: 'Male'  },
    {    id: 'check-female',    value: 'female', display: 'Female' },
    {    id: 'check-other',    value: 'other', display: 'Prefer not to say'  },
  ]

  onFormSubmit(){
    console.log(this.form);
  }
}
