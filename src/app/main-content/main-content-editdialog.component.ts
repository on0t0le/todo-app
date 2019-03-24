import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from '../task';


@Component({
  selector: 'app-main-content-editdialog',
  templateUrl: './main-content-editdialog.component.html',
  styleUrls: ['./main-content-editdialog.component.css']
})
export class MainContentEditdialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<MainContentEditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task    
  ) { }
}