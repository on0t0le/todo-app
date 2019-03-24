import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MainContentEditdialogComponent } from './main-content-editdialog.component';
import { Task } from '../task';
import { TasksService } from '../tasks.service';
import { compare } from 'fast-json-patch'

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {


  task = new FormControl('');
  tasks: Task[] = [];

  constructor(public dialog: MatDialog, private tasksService: TasksService) { }

  ngOnInit() {
    //Load all tasks
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getAllTasks().subscribe(
      data => {        
        this.tasks = data;
        console.warn('Data was fetched');        
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
        console.warn('New rask posted: ', data);
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
        console.warn('Task was deleted!');
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
      data: {id:task.id ,task: task.task, isDone: task.isDone}
    });
    //What to do after dialog-box closes
    dialogRef.afterClosed().subscribe(result => {
      //If result is null, then do nothing(good boy, just test windows opening)
      if (!result) {
        return;
      };
      //console.warn('Dialog-box result: ',result);
      //Compare tasks befor and after edit
      let body = compare(task,result);
      console.log('This is what go to body: ', body);
      if (!body.length){
        return;
      }
      //If receive data - go PATCH it!
      this.tasksService.editPathcTask(task.id, body).subscribe(
        () =>{
          console.warn('Patching succesfull!')          
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