import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { ConfigService } from '../config.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http:HttpClient,private config: ConfigService) {
    this.baseUrl = this.config.apiBaseUrl;
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  
  logout() {
    this.setUser(null);
  }

  login(value:{email:string,password:string}){
    return this.http.post<{user:any,token:string,message:string}>(`${this.baseUrl}/api/auth/login`,value).pipe(
      tap(response => {
        this.setUser(response.user);
      })
    );
  }
  
  register(value:any){
    let user = value;
    return this.http.post<any>(`${this.baseUrl}/api/auth/register`,user)
  }

  getProfile(id:string){
    return this.http.get<{user:[User],message:string}>(`${this.baseUrl}/api/user/${id}`)

  }
}
