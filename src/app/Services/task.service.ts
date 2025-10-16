import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task } from "../Model/task";
import { map, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  errorSubject = new Subject<HttpErrorResponse>();

  createTask(task: Task) {
    this.http.post('https://angularhttpclient-3b419-default-rtdb.firebaseio.com/task.json', task)
    .subscribe({error: (err)=>{
      console.error('Error creating task:', err);
      this.errorSubject.next(err);
    }})
  }

  deleteTask(taskid) {
    this.http.delete('https://angularhttpclient-3b419-default-rtdb.firebaseio.com/task/' + taskid + '.json')
    .subscribe({error: (err)=>{
      console.error('Error creating task:', err);
      this.errorSubject.next(err);
    }})
  }

  deleteAllTask() {
    this.http.delete('https://angularhttpclient-3b419-default-rtdb.firebaseio.com/task.json/')
    .subscribe({error: (err)=>{
      console.error('Error creating task:', err);
      this.errorSubject.next(err);
    }})
  }

  getAllTasks() {
    return this.http.get<{ [key: string]: Task }>(
      'https://angularhttpclient-3b419-default-rtdb.firebaseio.com/task.json'
    ).pipe(map((response) => {
      // Transform data
      let tasks = [];
      for (let key in response) {
        if (response.hasOwnProperty(key)) {
          tasks.push({ ...response[key], id: key });
        }
      }
      return tasks;
    }))
  }

  updateTask(taskid: string, task: Task){
    this.http.put('https://angularhttpclient-3b419-default-rtdb.firebaseio.com/task/' + taskid + '.json', task)
    .subscribe({error: (err)=>{
      console.error('Error creating task:', err);
      this.errorSubject.next(err);
    }})
  }
} 