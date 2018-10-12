// src/app/course.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CourseService } from './service';
import { Course } from './course';

@Component({
  selector: 'app-course',
  templateUrl: './component.html',
  styleUrls: ['./component.css']
})
export class CourseComponent implements OnInit {
  // Component properties
  allCourses: Course[];
  statusCode: number;
  courseIdToUpdate: number = null;
  requestProcessing = false;
  processValidation = false;

  // Create form
  courseForm = new FormGroup({
    title: new FormControl('', Validators.required),
    credit: new FormControl('', Validators.required),
    instructor: new FormControl('', Validators.required),
  });
  // Create constructor to get service instance
  constructor(private courseService: CourseService) {
  }
  // Create ngOnInit() and load courses
  ngOnInit(): void {
    this.getAllCourses();
  }
  // Fetch all courses
  getAllCourses() {
    this.courseService.getAllCourses()
      .subscribe(
        data => this.allCourses = data,
        errorCode =>  this.statusCode = errorCode);
  }
  // Handle create and update course
  onCourseFormSubmit() {
    this.processValidation = true;
    if (this.courseForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create or update
    this.preProcessConfigurations();
    const course = this.courseForm.value;
    if (this.courseIdToUpdate === null) {
      // Generate course id then create course
      this.courseService.getAllCourses()
        .subscribe(courses => {

          // Generate course id
          const maxIndex = courses.length - 1;
          const courseWithMaxIndex = courses[maxIndex];
          const courseId = courseWithMaxIndex.id + 1;
          course.id = courseId;

          // Create course
          this.courseService.createCourse(course)
            .subscribe(successCode => {
                this.statusCode = successCode;
                this.getAllCourses();
                this.backToCreateCourse();
              },
              errorCode => this.statusCode = errorCode
            );
        });
    } else {
      // Handle update course
      course.id = this.courseIdToUpdate;
      this.courseService.updateCourse(course)
        .subscribe(successCode => {
            this.statusCode = successCode;
            this.getAllCourses();
            this.backToCreateCourse();
          },
          errorCode => this.statusCode = errorCode);
    }
  }
  // Load course by id to edit
  loadCourseToEdit(courseId: string) {
    this.preProcessConfigurations();
    this.courseService.getCourseById(courseId)
      .subscribe(course => {
          this.courseIdToUpdate = course.id;
          this.courseForm.setValue({ title: course.title, instructor: course.instructor, credit: course.credit });
          this.processValidation = true;
          this.requestProcessing = false;
        },
        errorCode =>  this.statusCode = errorCode);
  }
  // Delete course
  deleteCourse(courseId: string) {
    this.preProcessConfigurations();
    this.courseService.deleteCourseById(courseId)
      .subscribe(successCode => {
          // this.statusCode = successCode;
          // Expecting success code 204 from server
          this.statusCode = 204;
          this.getAllCourses();
          this.backToCreateCourse();
        },
        errorCode => this.statusCode = errorCode);
  }
  // Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  // Go back from update to create
  backToCreateCourse() {
    this.courseIdToUpdate = null;
    this.courseForm.reset();
    this.processValidation = false;
  }
}
