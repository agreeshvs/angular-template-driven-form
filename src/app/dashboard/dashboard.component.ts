import { Component, inject } from '@angular/core';
import { Task } from '../Model/task';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { TaskService } from '../Services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showCreateTaskForm: boolean = false;
  taskList: Task[] = [];

  http: HttpClient = inject(HttpClient);
  loadingTask: boolean;
  taskService: TaskService = inject(TaskService)

  ngOnInit(){
    this.fetchAllTasks();
  }

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }

  createTask(data: Task){
    this.taskService.createTask(data);
    setTimeout(() => {
      this.fetchAllTasks(); 
      this.CloseCreateTaskForm();
    },1000);
    
  }

  fetchAllTasks(){
    this.loadingTask = true;
    this.taskService.getAllTasks().subscribe( data =>{
      this.taskList = data;
       setTimeout(() => {
        this.loadingTask = false;
      });
    })
   
  }

  deleteTask(taskid){
    console.log("Task deleted", taskid);
    this.taskService.deleteTask(taskid);
    setTimeout(() => {
     this.fetchAllTasks(); 
    },1000);
  }

  // Delete all tasks
  clearAllTask(){
    this.taskService.deleteAllTask();
    setTimeout(() => {
     this.fetchAllTasks(); 
    },1000);
  }
}
