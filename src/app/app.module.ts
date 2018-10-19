// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CourseComponent } from './course/component';
import { CourseService } from './course/service';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    CourseComponent,
    UsersComponent
  ],
  providers: [
    CourseService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
