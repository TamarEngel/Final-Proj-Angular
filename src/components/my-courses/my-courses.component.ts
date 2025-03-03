import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course-service/course-service.service';
import { Course } from '../../models/course';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [MatCardModule,MatExpansionModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {

  myCourses: Course[] = [];
  constructor(private courseService: CourseService) { }
  ngOnInit(): void {
    this.courseService.myCourses().subscribe({
      next: (response) => { this.myCourses=response },
      error: (e) => {console.log(e.error.message);
      }
    })
  }
}
