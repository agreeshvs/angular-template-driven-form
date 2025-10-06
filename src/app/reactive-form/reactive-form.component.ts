import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      username: new FormControl(''),
      dob: new FormControl(''),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl('',Validators.required),
        country: new FormControl('India',Validators.required),
        city: new FormControl(''),
        region: new FormControl(''),
        postalCode: new FormControl('',Validators.required)
      })
      
    });
  }

  onSubmit(){
    console.log(this.reactiveForm);
  }
}
