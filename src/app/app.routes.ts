import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { CoursesListComponent } from '../components/courses-list/courses-list.component';
import { AllCoursesComponent } from '../components/all-courses/all-courses.component';
import { MyCoursesComponent } from '../components/my-courses/my-courses.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent, },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'availableCourses', component: CoursesListComponent, canActivate:[authGuard]},
    { path: 'allCourses', component: AllCoursesComponent, canActivate:[authGuard]},
    { path: 'myCourses', component: MyCoursesComponent ,canActivate:[authGuard]},
];
