import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../Validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  reactiveForm: FormGroup;
  formStatus: string = '';

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      // Define your form controls here
      firstName: new FormControl('',[Validators.required, CustomValidators.noSpaceAllowed]),
      lastName: new FormControl('',[Validators.required, CustomValidators.noSpaceAllowed]),
      email: new FormControl('',[Validators.required, Validators.email]),
      username: new FormControl('',[Validators.required],CustomValidators.checkusername),
      dob: new FormControl(''),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl('',Validators.required),
        country: new FormControl('India',Validators.required),
        city: new FormControl(''),
        region: new FormControl(''),
        postalCode: new FormControl('',Validators.required)
      }),
      skills: new FormArray([
        new FormControl('', Validators.required)
      ]),
      experience: new FormArray([
        // Make empty experience form array initially
      ])
      
    });

    // Value change event on form control
    this.reactiveForm.get('firstName').valueChanges.subscribe( (value) => {
      console.log('firstName valuechange ',value);
    });


    // Value change event on formgroup
    this.reactiveForm.valueChanges.subscribe( (data) =>{
      // console.log(data);
    })

    // State change event on form control
    this.reactiveForm.get('email').statusChanges.subscribe( (status) => {
      console.log('email status change ',status);
    });

    this.reactiveForm.get('username').statusChanges.subscribe( (status) => {
      console.log('username status change ',status);
    });

    // Status change event on formgroup
    this.reactiveForm.statusChanges.subscribe( (status) => {
      console.log('form status change ',status);
      this.formStatus = status;
    });

    
  }

  onSubmit(){
    this.reactiveForm.markAllAsTouched();
    console.log(this.reactiveForm);
  }

  addSkillControl(){
    (
      (this.reactiveForm.get('skills') as FormArray).push(
        new FormControl('', Validators.required)
      )
    );
  }

  removeSkillControl(index: number){
    (
      (this.reactiveForm.get('skills') as FormArray).removeAt(index)
    );
  }

  addExperience(){
    // Create a new FormGroup for experience
    const formGroup = new FormGroup({
      company: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      experience: new FormControl('', [Validators.required, Validators.min(0)]),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required)
    });

    // Push the new FormGroup into the FormArray
    // ( this.reactiveForm.get('experience') as FormArray ).push(
    //   formGroup 
    // );

    (<FormArray>this.reactiveForm.get('experience')).push(formGroup)
  }

  deleteExperience(index: number){
    (this.reactiveForm.get('experience') as FormArray).removeAt(index);
  }

  createUsername(){
    let username = '';
    const firstname = this.reactiveForm.get('firstName').value;
    const lastname = this.reactiveForm.get('lastName').value;
    const dob = this.reactiveForm.get('dob').value;

    if( firstname.length >= 3){
      username += firstname.slice(0,3);
    }
    else{
      username += firstname;
    }
    if( lastname.length >= 3){
      username += lastname.slice(0,3);
    }
    else{
      username += lastname;
    }
    
    if(dob){
      const year = new Date(dob).getFullYear().toString();
      username += year;
    }

    this.reactiveForm.get('username').setValue(username.toLowerCase());
  }
}
