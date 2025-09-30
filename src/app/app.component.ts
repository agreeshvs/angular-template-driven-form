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
  dob: string = '';

  genders = [
    {    id: 'check-male',    value: 'male', display: 'Male'  },
    {    id: 'check-female',    value: 'female', display: 'Female' },
    {    id: 'check-other',    value: 'other', display: 'Prefer not to say'  },
  ]

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  onFormSubmit(){
    this.form.control.markAllAsTouched();
    this.form.valid ? alert('Form Submitted!') : alert('Please fill the form correctly.');
    console.log(this.form);
  }

  generateUsername(){
    alert('Username generated successfully!');
    let username = '';
    if( this.firstName.length >= 3){
      username += this.firstName.slice(0,3);
    }
    else{
      username += this.firstName;
    }
    if( this.lastName.length >=3 ){
      username += this.lastName.slice(0,3);
    }
    else{
      username += this.lastName;
    }
    if( this.dob ){
      const year = new Date(this.dob).getFullYear();
      username += year;
    }
    // this.form.controls['username'].setValue(username.toLowerCase());
    /* this.form.setValue({
      firstName: this.form.value.firstName,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
      dateofbirth: this.form.value.dateofbirth,
      username: username.toLowerCase(),
      gender: this.form.value.gender,
      address:{
        street1: this.form.value.address.street1,
        street2: this.form.value.address.street2,
        country: this.form.value.address.country,
        city: this.form.value.address.city,
        postalCode: this.form.value.address.postalCode,
        region: this.form.value.address.region
      }
    }); */

    // Set Value (update entire form)
    // Helps to update entire form fields

    // Patch Value (only update username)
    // Helps to update only few form fields
    this.form.form.patchValue({
      username: username.toLowerCase()
    });
  }
}
