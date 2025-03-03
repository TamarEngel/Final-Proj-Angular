import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { Lesson } from '../../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get<Course[]>('http://localhost:3000/api/courses')
  }
  addCourse(newCourse:Course):Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/courses',newCourse)
  }
  deleteCourse(id: number | undefined) :Observable<any>{
    return this.http.delete(`http://localhost:3000/api/courses/${id}`)
  }
  editCourse(courseId: number, course: Course)  :Observable<any>{
    return this.http.put<any>(`http://localhost:3000/api/courses/${courseId}`, course)
  }
  enrollCourse(id:number| undefined, userId:string|null) :Observable<any>{
    return this.http.post(`http://localhost:3000/api/courses/${id}/enroll`,{userId})
  }
  unenrollCourse(id:number| undefined, userId:string|null) :Observable<any>{
    return this.http.delete(`http://localhost:3000/api/courses/${id}/unenroll`,{body: {userId}})
  }
  myCourses():Observable<any>{
    return this.http.get<Course[]>(`http://localhost:3000/api/courses/student/${localStorage.getItem('userId')}`);
  }
}
