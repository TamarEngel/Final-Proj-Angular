import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { CourseService } from '../../services/course-service/course-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateNewCourseComponent } from "../create-new-course/create-new-course.component";
import { LessonsServiceService } from '../../services/lesson-service/lessons-service.service';
import { Lesson } from '../../models/lesson';
import { LessonFormComponent } from "../lesson-form/lesson-form.component";

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatExpansionModule, MatListModule, CreateNewCourseComponent, LessonFormComponent],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent implements OnInit {

  courses: Course[] = [];
  role: string = '';
  add: boolean = false;
  edit: boolean = false;
  addLes: boolean = false;
  editLes: boolean = false;
  course: Course = new Course('', '', 0, 0, []);
  lesson: Lesson = new Lesson(0, '', '', 0);

  constructor(private courseService: CourseService, private authService: AuthService, private lessonService: LessonsServiceService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (response) => {
        this.courses = response,
          this.loadLesson(),
          console.log(this.courses);
        this.role = localStorage.getItem('role') || '';
      },
      error: (e) => { console.error(e.messege); }
    })
  }
  loadLesson() {
    this.courses.forEach(course => {
      this.lessonService.getLessons(course.id).subscribe({
        next: (response) => {
          course.lessons = response;
        },
        error: (err) => {
          console.error(`Error fetching lessons for course ${course.id}`, err);
        }
      });
    });
    console.log(this.courses);
  }

  toggleEdit(course: Course) {
    this.course = course;
    this.edit = true;
  }

  toggleAdd() {
    this.course = new Course('', '', 0, 0, []);
    this.add = true;
  }

  addCourse(course: Course) {
    this.add = false;
    if (course) {
      this.courseService.addCourse(course).subscribe({
        next: (response) => { alert('✅' + response.message), this.loadCourses() },
        error: (e) => { alert('❌ ERROR: ' + (e.error.message || 'משהו השתבש')) }
      })
    }
  }

  editCourse(course: Course) {
    this.edit = false;
    if (course) {
      this.courseService.editCourse(course.id!, course).subscribe({
        next: (response) => { alert('✅' + response.message), this.loadCourses() },
        error: (e) => { alert('❌ ERROR: ' + (e.error.message || 'משהו השתבש')) }
      })
    }
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe({
      next: (response) => {
        console.log('Success:', response.messege)
        this.loadCourses()
      },
      error: err => console.error('Error:', err)
    })
  }

  toggLessonEdit(les: Lesson) {
    this.lesson = les;
    this.editLes = true;
  }

  toggLessonAdd(idCourse:number) {
    this.lesson = new Lesson(0, '', '', idCourse);
    this.addLes = true;
  }

  addLesson(newLes : Lesson){
    this.addLes = false;
    if (newLes) {
      this.lessonService.addLesson(newLes).subscribe({
        next: (response) => { alert('✅' + response.message), this.loadLesson() },
        error: (e) => { alert('❌ ERROR: ' + (e.error.message || 'משהו השתבש')) }
      })
    }
  }

  editLesson(updateLes : Lesson){
    this.editLes = false;
    if (updateLes) {
      this.lessonService.updateLesson(updateLes).subscribe({
        next: (response) => { alert('✅' + response.message), this.loadLesson() },
        error: (e) => { alert('❌ ERROR: ' + (e.error.message || 'משהו השתבש')) }
      })
    }
  }

  deleteLesson(idLes : number,idCourse:number){
    this.lessonService.deleteLesson(idLes,idCourse).subscribe({
      next: (response) => {
        console.log('Success:', response.messege)
        this.loadLesson();
      },
      error: err => console.error('Error:', err)
    })
  }
}
