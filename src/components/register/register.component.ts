import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../../models/userRegister';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatExpansionModule, MatListModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  hidePassword: boolean = true;
  userRegister!: UserRegister;
  userRegisterForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.userRegisterForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      role: ['', [Validators.required]],
    })
  }
  get user(): { [key: string]: AbstractControl } {
    return this.userRegisterForm.controls;
  }
  onSubmit() {
    this.userRegister = this.userRegisterForm.value
    this.authService.authRegister(this.userRegister).subscribe({
      next: (response) => { alert('✅' + response.message) },
      error: (e) => { alert('❌ ERROR: ' + (e.error.message || 'משהו השתבש')) }
    })
    this.router.navigate(['/login'])
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
