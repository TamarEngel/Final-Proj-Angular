import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = sessionStorage.getItem('token');

  if (!isLoggedIn) {
    Swal.fire({
      title: 'Welcome!',
      text: 'You need to log in or sign up before you can proceed.',
      icon: 'info', // אייקון מידע ℹ️
      confirmButtonText: 'LOGIN?',
      showCancelButton: true,
      cancelButtonText: 'CANCEL',
      confirmButtonColor: '#a3d8f4',
      cancelButtonColor: '#f0f0f0'
    }).then((result) => {
      if (result.isConfirmed) {
        router.navigate(['/login']); // מפנה לדף הבית (או לדף ההתחברות אם צריך)
      }
    });

    return false;
  }

  return true;
};
