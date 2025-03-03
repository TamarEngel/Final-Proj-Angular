import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { CourseService } from '../../services/course-service/course-service.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule,MatButtonModule,MatIconModule,MatMenuModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{

  //userName: string = '';

  constructor(private courseService: CourseService, private authService: AuthService) { }

  getFromSessionStorage(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  // getName(){
  //   this.userName = this.authService.getUsernameFromToken().charAt(0).toUpperCase()
  // }
}
