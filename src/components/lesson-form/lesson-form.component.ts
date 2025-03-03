import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lesson } from '../../models/lesson';
import { LessonsServiceService } from '../../services/lesson-service/lessons-service.service';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatExpansionModule, MatListModule],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css'
})
export class LessonFormComponent {
  @Input() les: Lesson = new Lesson(0,'','',0);
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  isModalOpen: boolean = true;

  newLesson!: Lesson;
  lessonForm!: FormGroup
  constructor(private fb: FormBuilder, private lessonService: LessonsServiceService) { }
  ngOnInit(): void {
    this.lessonForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
    })

    if (this.les) {
      this.lessonForm.patchValue({
        title: this.les.title,
        content: this.les.content
      });
    }
  }

  get less(): { [key: string]: AbstractControl } {
    return this.lessonForm.controls;
  }
  onSubmit() {
    if (this.lessonForm.valid) {
      this.les = {
        ...this.les,
        ...this.lessonForm.value
      };
      //const userId = localStorage.getItem('userId');
      //this.coursee.teacherId = userId ? parseInt(userId, 10) : undefined;
      this.save.emit(this.les);
    }
  }
  onCancel() {
    this.isModalOpen = false;
    this.save.emit(null);
  }
}
