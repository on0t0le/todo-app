import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {

  task = new FormControl('');
  tasks: string [] = [];

  constructor() { }

  addItem(){
    if(!this.task.value){
      return;
    }
    console.log(this.task.value);
    this.tasks.push(this.task.value);
  }
}
