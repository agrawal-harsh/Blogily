import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;

  constructor(private http:HttpClient,private config: ConfigService) {
    this.baseUrl = this.config.apiBaseUrl;
  }

  login(value:{email:string,password:string}){
    return this.http.post<{user:any,token:string,message:string}>(`${this.baseUrl}/api/auth/login`,value)
  }
  
  register(value:any){
    let user = value;
    return this.http.post<any>(`${this.baseUrl}/api/auth/register`,user)
  }

  getProfile(id:string){
    return this.http.get<{user:[User],message:string}>(`${this.baseUrl}/api/user/${id}`)

  }
}
