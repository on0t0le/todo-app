import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MainContentEditdialogComponent } from './main-content-editdialog.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  
  task = new FormControl('');
  tasks = [
    { id: 1, task: 'Make todo-app' },
    { id: 2, task: 'Create API for todo-app' }
  ];

  lastId: number = this.idInit();

  constructor(public dialog: MatDialog) { }

  addItem() {
    if (!this.task.value) {
      return;
    }
    // console.log(this.task.value);
    let newTask = {
      id: this.idGenerator(),
      task: this.task.value
    };    
    this.tasks.push(newTask);
  }

  editTask(task) {
    // console.log(task);
    const dialogRef = this.dialog.open(MainContentEditdialogComponent, {
      height: '400px',
      width: '600px',
      restoreFocus: false,
      data: { id: task.id, task: task.task }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if(!result){
        return;
      }
      task.task = result;      
    });
  }

  deleteTask(task) {
    // console.log(task);
    const index: number = this.tasks.indexOf(task);
    if (index !== -1) {
        this.tasks.splice(index, 1);
    }   
  }

  idGenerator(): number{
    this.lastId = this.lastId + 1;
    return this.lastId;
  }

  idInit(): number{    
    if(this.tasks.length != 0){
      return this.tasks[(this.tasks.length-1)].id;    
    }
    return 0;
  }

}
