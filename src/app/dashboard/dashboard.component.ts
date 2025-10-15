import { Component, inject } from '@angular/core';
import { Task } from '../Model/task';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

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

  ngOnInit(){
    this.getTask();
  }

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }

  createTask(data: Task){
    console.log('Task Created Successfully',data);
    this.taskList.push(data);
    this.http.post('https://angularhttpclient-3b419-default-rtdb.firebaseio.com/task.json',data).subscribe( data => {
      console.log('Data posted to server successfully',data);
      this.getTask()
    })
  }

  getTask(){
    this.loadingTask = true;
    this.http.get<{[key: string]: Task}>(
      'https://angularhttpclient-3b419-default-rtdb.firebaseio.com/task.json'
    ).pipe( map((response)=>{
      // Transform data
      let tasks = [];
      for( let key in response){
        if( response.hasOwnProperty(key)){
          tasks.push({...response[key], id: key});
        }        
      }
      return tasks;
    }))
  .subscribe( tasks => {
      console.log("task list", tasks);
      this.taskList = tasks;
      setTimeout(() => {
        this.loadingTask = false;
      });
    })
  }
}
