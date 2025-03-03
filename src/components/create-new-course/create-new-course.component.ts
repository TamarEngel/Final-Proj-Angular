import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course-service/course-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-new-course',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatExpansionModule, MatListModule],
  templateUrl: './create-new-course.component.html',
  styleUrl: './create-new-course.component.css'
})
export class CreateNewCourseComponent implements OnInit {
  @Input() coursee: Course = new Course('', '', 0, 0, []);
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  isModalOpen: boolean = true;

  newCourse!: Course;
  courseForm!: FormGroup
  constructor(private fb: FormBuilder, private courseService: CourseService) { }
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    })

    if (this.coursee) {
      this.courseForm.patchValue({
        title: this.coursee.title,
        description: this.coursee.description
      });
    }
  }

  get course(): { [key: string]: AbstractControl } {
    return this.courseForm.controls;
  }
  onSubmit() {
    if (this.courseForm.valid) {
      this.coursee = {
        ...this.coursee,
        ...this.courseForm.value
      };
      const userId = localStorage.getItem('userId');
      this.coursee.teacherId = userId ? parseInt(userId, 10) : undefined;
      this.save.emit(this.coursee);
    }
  }
  onCancel() {
    this.isModalOpen = false;
    this.save.emit(null);
  }
}






