import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  reactiveForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      // Define your form controls here
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      username: new FormControl(''),
      dob: new FormControl(''),
      gender: new FormControl('male'),
      street: new FormControl(''),
      country: new FormControl('India'),
      city: new FormControl(''),
      region: new FormControl(''),
      postalCode: new FormControl(''),
      phone: new FormControl('')
    });
  }

  onSubmit(){
    console.log(this.reactiveForm.value);
  }
}
