import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {
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
  postal: any;
  city: any;
  country: any;
  region: any;
  phoneNumber: any;
  username: any;
  street1: any;
  street2: any;
  isAgreed: boolean = false;


  onFormSubmit(){
    this.form.control.markAllAsTouched();
    this.form.valid ? alert('Form Submitted!') : alert('Please fill the form correctly.');
    console.log(this.form.value);
    this.firstName = this.form.value.firstName;
    this.lastName = this.form.value.lastName;
    this.emailAddress = this.form.value.email;
    this.dob = this.form.value.dateofbirth;
    this.postal = this.form.value.address.postalCode;
    this.city = this.form.value.address.city;
    this.country = this.form.value.address.country;
    this.region = this.form.value.address.region;
    this.phoneNumber = this.form.value.phoneNumber;
    this.username = this.form.value.username;
    this.street1 = this.form.value.address.street1;
    this.street2 = this.form.value.address.street2;
    console.log(this.country);
    setTimeout(() => {
      // this.resetForm();
    }, 2000);
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

  resetForm(){
    this.form.reset();
    this.form.form.patchValue({
      gender: 'male',
      address: {
        country: 'India'
      }
    });

    console.log(this.form);
  }
}
