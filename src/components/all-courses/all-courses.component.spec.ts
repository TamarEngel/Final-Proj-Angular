import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoursesComponent } from './all-courses.component';

describe('MyCoursesComponent', () => {
  let component: AllCoursesComponent;
  let fixture: ComponentFixture<AllCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
