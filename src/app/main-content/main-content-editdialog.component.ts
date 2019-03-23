import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../task';
import { compare } from 'fast-json-patch'

@Component({
  selector: 'app-main-content-editdialog',
  templateUrl: './main-content-editdialog.component.html',
  styleUrls: ['./main-content-editdialog.component.css']
})
export class MainContentEditdialogComponent implements OnInit {
  
  refTask: Task;
  newref: Task = {
    task: "",
    isDone: false
  };

  ngOnInit(): void {
    this.refTask = this.data;
    this.newref.id = this.refTask.id;
    this.newref.isDone = this.refTask.isDone;
    console.log('Ref data: ',this.refTask);
  }

  constructor(
    public dialogRef: MatDialogRef<MainContentEditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) { }

  onOkClick(){
    return compare(this.refTask, this.newref);
  }
}