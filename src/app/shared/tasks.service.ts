import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { firebaseUrl } from 'src/environments/environment.keys';

export interface Task {
  id?: string;
  title: string;
  description?: string;
  date?: string;
}
interface CreateResponse {
  name: string;
}
@Injectable({ providedIn: 'root' })
export class TasksService {
  static url = firebaseUrl;

  constructor(private http: HttpClient) {}

  load(date: moment.Moment): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map((tasks) => {
          console.log('tasks', tasks);
          if (!tasks) {
            return [];
          }
          return Object.keys(tasks).map((key) => ({
            ...tasks[<any>key],
            id: key,
          }));
        })
      );
  }

  create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(
        map((res) => {
          console.log('res', res);
          return { ...task, id: res.name };
        })
      );
  }
  remove(task: Task): Observable<void> {
    return this.http.delete<void>(
      `${TasksService.url}/${task.date}/${task.id}.json`
    );
  }
}
