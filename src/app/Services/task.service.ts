import { HttpClient } from "@angular/common/http";
import {  inject, Injectable } from "@angular/core";
import { Task } from "../Model/task";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskService{
    http: HttpClient = inject(HttpClient)

    createTask(task: Task){
    this.http.post('https://angularhttpclient-3b419-default-rtdb.firebaseio.com/task.json',task).subscribe( data => {
      console.log('Data posted to server successfully',data);
    })
    }

    deleteTask(taskid){
        this.http.delete('https://angularhttpclient-3b419-default-rtdb.firebaseio.com/task/'+taskid+'.json').subscribe( response => {
      console.log("Task deleted successfully", response);
    })
    }

    deleteAllTask(){
        this.http.delete('https://angularhttpclient-3b419-default-rtdb.firebaseio.com/task.json/').subscribe( response => {
      console.log("Task deleted successfully", response);
    })
    }

    getAllTasks(){
       return this.http.get<{[key: string]: Task}>(
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
    }
}