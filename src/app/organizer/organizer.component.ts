import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { DataService } from '../shared/date.service';
import { TasksService, Task } from '../shared/tasks.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
})
export class OrganizerComponent implements OnInit {
  form!: FormGroup;
  tasks: Task[] = [];

  constructor(
    public dateService: DataService,
    private TasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.dateService.date
      .pipe(switchMap((value) => this.TasksService.load(value)))
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }
  remove(task: Task) {
    this.TasksService.remove(task).subscribe(
      () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  submit() {
    const { title, description } = this.form.value;
    const task: Task = {
      title,
      description,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    };
    this.TasksService.create(task).subscribe(
      (task) => {
        console.log('newTask', task);
        this.tasks.push(task);
        this.form.reset();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
