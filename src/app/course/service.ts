// src/app/course.service.ts
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';
import { Course } from './course';


@Injectable()
export class CourseService {
  // URL for CRUD operations
  courseUrl = 'http://localhost:3000/courses';
  // Create constructor to get Http instance
  constructor(private http: Http) {
  }
// Fetch all courses
  getAllCourses(): Observable<Course[]> {
    console.log('Fetch all courses....');
    return this.http.get(this.courseUrl)
    .pipe(map(success => success.json()));
    catchError(this.handleError);
  }
// Create course
  createCourse(course: Course): Observable<number> {
    // console.log('Create Course...........');
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.courseUrl, course, options)
      .pipe(map(success => success.json()));
      catchError(this.handleError);
  }
// Fetch course by id
  getCourseById(courseId: string): Observable<Course> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    console.log(this.courseUrl + '/' + courseId);
    return this.http.get(this.courseUrl + '/' + courseId)
      .pipe(map(success => success.json()));
      catchError(this.handleError);
  }
//  Update course
  updateCourse(course: Course): Observable<number> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.courseUrl + '/' + course.id, course, options)
      .pipe(map(success => success.json()));
       catchError(this.handleError);
  }
// Delete course
  deleteCourseById(courseId: string): Observable<number> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const course = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.courseUrl + '/' + courseId)
      .pipe(map(success => success.json()));
      catchError(this.handleError);
  }
  private extractData(res: Response) {
    const body = res.json();
    return body;
  }
  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
