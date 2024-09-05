import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response';
import { LoginRequest } from '../interfaces/login-request';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string = environment.apiUrl ;
  tokenKey:string = 'token';
  private readonly jwtHelper = inject(JwtHelperService);

  constructor(private httpClient:HttpClient) {}
    
  login(data: LoginRequest): any{
     this.httpClient
    .post<AuthResponse>(`${this.apiUrl}login`, data)
    .subscribe({
      next(response) {
        if(response?.token)
        {
          localStorage.setItem('token', response.token);
        }
      },
    });

  }

    isLoggedIn = (): boolean => {
      const token = this.getToken();
      if(!token) return false;
      return !this.isTokenExpired();
    };


  private isTokenExpired() {
    const token = this.getToken();
    if(!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000 ;
    if(isTokenExpired) this.logout();
    return isTokenExpired; 
  }

  logout = ():void =>{
    localStorage.removeItem(this.tokenKey);
  }

  getToken():string{
    return localStorage.getItem(this.tokenKey) || '' ;
  }

  
}
