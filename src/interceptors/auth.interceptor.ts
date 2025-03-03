import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service/auth-service.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  console.log("in interceptor");
  const authService = inject(AuthService);
  const token = authService.getToken();
  //const token = sessionStorage.getItem('token');

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }
  return next(req);
};

