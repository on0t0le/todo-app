import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MainContentEditdialogComponent } from './main-content-editdialog.component';
import { Task } from '../task';
import { TasksService } from '../tasks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {


  task = new FormControl('');
  tasks: Task[] = [];

  constructor(public dialog: MatDialog, private tasksService: TasksService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    //Load all tasks
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getAllTasks().subscribe(
      data => {
        this.tasks = data;
        //NOT WORKING YET!!!! Need FIX!!!
        this.cd.markForCheck();
      },
      err => {
        //Something went wrong
        console.error(err);
      }
    );

  }

  addItem() {
    //If nothing was inputed do nothing too
    if (!this.task.value) {
      return;
    }
    //Instanciate new task
    let newTask: Task = {
      task: this.task.value,
      isDone: false
    }
    this.tasksService.addTask(newTask).subscribe(
      (data: Task) => {
        console.log('Posted', data);
        //Reload list of tasks
        this.getTasks();
      },
      err => {
        console.error(err);
      }
    );

  }

  deleteTask(task) {
    this.tasksService.deleteTask(task).subscribe(       
      () => {
        //console.log(ok);
        //Reload list of tasks
        this.getTasks();
      },
      err => {
        console.error(err);
      }
    );
  }

  editTask(task: Task) {
    //Create dialog-box and transfer task as data in it
    const dialogRef = this.dialog.open(MainContentEditdialogComponent, {
      height: '400px',
      width: '600px',
      restoreFocus: false,
      data: task
    });
    //What to do after dialog-box closes
    dialogRef.afterClosed().subscribe(result => {
      //If result is null, then do nothing(good boy, just test windows opening)
      if (!result) {
        return;
      };
      //If receive data - go PATCH it!
      this.tasksService.editPathcTask(task.id, result).subscribe(
        responce =>{
          //console.log(responce);
          //Reload list of tasks
          this.getTasks();
        },
        err =>{          
          console.error(err);
        }
      );      
    });

    
  }
}