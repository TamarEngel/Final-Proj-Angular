import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonsServiceService {

  constructor(private http: HttpClient) { }

  getLessons(courseId:number|undefined):Observable<any>{
    return  this.http.get<Lesson[]>(`http://localhost:3000/api/courses/${courseId}/lessons`)
  }
  
  addLesson(newles: Lesson):Observable<any>{
    return  this.http.post(`http://localhost:3000/api/courses/${newles.courseId}/lessons`, newles)
  }

  updateLesson(updateLes: Lesson):Observable<any>{
    return  this.http.put(`http://localhost:3000/api/courses/${updateLes.courseId}/lessons/${updateLes.id}`, updateLes)
  }

  deleteLesson(idLes: number,idCourse:number):Observable<any>{
    return  this.http.delete(`http://localhost:3000/api/courses/${idCourse}/lessons/${idLes}`)
  }
}
