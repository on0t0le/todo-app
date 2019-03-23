import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './task';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = "http://localhost:5000/api"

  constructor(private http: HttpClient) { }

  getAllTasks():Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl+'/tasks');
  }

  addTask(task: Task) {
    return this.http.post<Task>(this.baseUrl+'/tasks',task, httpOptions);
  }

  deleteTask(task: Task){
    return this.http.delete(this.baseUrl+`/tasks/${task.id}`, httpOptions);
  }
}

