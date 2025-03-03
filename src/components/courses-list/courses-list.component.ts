import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { CourseService } from '../../services/course-service/course-service.service';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [MatCardModule,MatExpansionModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent implements OnInit{
  courses: Course[] = [];
  userId=localStorage.getItem('userId');
  constructor(private courseService: CourseService, private authService: AuthService) { }
  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (response) => { this.courses = response},
      error: (e) => { console.error(e.messege) }
    })
  }

  enrollCourse(idCourse:number){
    this.courseService.enrollCourse(idCourse,this.userId).subscribe({
      next: (response) => {
        alert('✅' + response.message)
      },
      error: (e) => { alert('❌ ERROR: ' + (e.error.message || 'משהו השתבש')) }
    })
  }

  unenrollCourse(idCourse:number){
    this.courseService.unenrollCourse(idCourse,this.userId).subscribe({
      next: (response) => {
        alert('✅' + response.message)
      },
      error: (e) => { alert('❌ ERROR: ' + (e.error.message || 'משהו השתבש')) }
    })
  }
}
