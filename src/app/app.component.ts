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
  firstName: string = '';
  lastName: string = '';
  emailAddress: string = '';
  defaultGender: string = 'male';
  defaultCountry: string = 'India';

  genders = [
    {    id: 'check-male',    value: 'male', display: 'Male'  },
    {    id: 'check-female',    value: 'female', display: 'Female' },
    {    id: 'check-other',    value: 'other', display: 'Prefer not to say'  },
  ]

  onFormSubmit(){
    this.form.control.markAllAsTouched();
    this.form.valid ? alert('Form Submitted!') : alert('Please fill the form correctly.');
    console.log(this.form);
  }
}
