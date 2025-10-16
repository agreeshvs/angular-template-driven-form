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
  taskService: TaskService = inject(TaskService);
  isEditMode: boolean = false
  selectedTask: Task;

  ngOnInit(){
    this.fetchAllTasks();
  }

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
    this.isEditMode = false;
    this.selectedTask = {title: '',
      description: '',
      createdAt: '',
      priority:'',
      status: '',
      assignedTo: ''
     }
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }

  createOrUpdateTask(data: Task){
    if( !this.isEditMode)
      this.taskService.createTask(data);
    else
      this.taskService.updateTask(this.selectedTask.id, data);
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

  onEditTask(id: string | undefined){
    // Open the form with existing data
    this.isEditMode = true;
    this.showCreateTaskForm = true;
    this.selectedTask = this.taskList.find(item => item.id === id);
    console.log("selectedTask", this.selectedTask);
  }
}
