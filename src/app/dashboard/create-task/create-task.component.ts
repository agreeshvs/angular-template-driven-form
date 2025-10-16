import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/Model/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitTaskData: EventEmitter<Task> = new EventEmitter<Task>();
  @Input() isEditMode: boolean = false;
  @Input() selectedTask: Task
  @ViewChild('taskForm') taskForm: NgForm;

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

  onSubmit(form: NgForm){
    this.emitTaskData.emit(form.value);
    console.log("onSubmit",form.value);
    this.OnCloseForm();
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.taskForm.form.patchValue(this.selectedTask)    
    }, 0);
  }
}
