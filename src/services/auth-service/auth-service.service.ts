import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../../models/userRegister';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  authRegister(userRegister:UserRegister):Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/auth/register',userRegister)
  }
  authLogin(userLogin :UserRegister):Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/auth/login',userLogin)
  }
  saveToken(token: string) {
    console.log(token)
    sessionStorage.setItem('token', token)
  }

  getToken() {
    return sessionStorage.getItem('token')
  }

  getUsernameFromToken(): string {
    const token = this.getToken()
    if (!token) return ''
    try {
      const decodedToken: any = jwtDecode(token)
      console.log(decodedToken)
      return decodedToken.userName
    }
    catch (error) {
      console.error('שגיאה בפענוח ה-Token:', error)
      return ''
    }
  }
  Logout() {
    sessionStorage.removeItem('token')
  }

  getUser(userId:string){
    return this.http.get<UserRegister>(`http://localhost:3000/api/users/${userId}`)
  }
}
