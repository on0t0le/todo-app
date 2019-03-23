import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MainContentEditdialogComponent } from './main-content-editdialog.component';
import { Task } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {


  task = new FormControl('');
  tasks: Task[] = [];

  // lastId: number = this.idInit();

  constructor(public dialog: MatDialog, private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.getAllTasks().subscribe(
      data => {
        this.tasks = data as Task[];
      },
      err => {
        console.error(err);
      }
    );
  }

  addItem() {
    if (!this.task.value) {
      return;
    }
    // console.log(this.task.value);
    // let newTask: Task = {
    //   id: this.idGenerator(),
    //   task: this.task.value,
    //   isDone: false
    // };
    // this.tasks.push(newTask);
    let newTask: Task = {
      task: this.task.value,
      isDone: false
    }
    this.tasksService.addTask(newTask).subscribe(
      (data: Task) => {
        console.log('Posted', data);
      },
      err => {
        console.error(err);
      }
    );

  }

  editTask(task) {
    // console.log(task);

    // const dialogRef = this.dialog.open(MainContentEditdialogComponent, {
    //   height: '400px',
    //   width: '600px',
    //   restoreFocus: false,
    //   data: { id: task.id, task: task.task }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log(result);
    //   if (!result) {
    //     return;
    //   }
    //   task.task = result;
    // });
  }

  deleteTask(task) {
    // console.log(task);
    // const index: number = this.tasks.indexOf(task);
    // if (index !== -1) {
    //   this.tasks.splice(index, 1);
    // }
    this.tasksService.deleteTask(task).subscribe(
      (ok) => {
        console.log(ok)
      },
      err => {
        console.error(err);
      }
    );
  }

  // idGenerator(): number {
  //   this.lastId = this.lastId + 1;
  //   return this.lastId;
  // }

  // idInit(): number {
  //   if (this.tasks.length != 0) {
  //     return this.tasks[(this.tasks.length - 1)].id;
  //   }
  //   return 0;
  // }

}

// const tasksList: Task[] = [
//   { id: 1, task: 'Make todo-app', isDone: false },
//   { id: 2, task: 'Create API for todo-app', isDone: true }
// ]
