import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Material components
import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule
} from '@angular/material'

import { AppComponent } from './app.component';
import { MainContentComponent } from './main-content/main-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainContentEditdialogComponent } from './main-content/main-content-editdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    MainContentEditdialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule
  ],

  entryComponents: [
    MainContentEditdialogComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
