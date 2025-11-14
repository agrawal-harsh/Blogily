import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {}

  login(value:{email:string,password:string}){
    return this.http.post<{user:any,token:string,message:string}>('http://localhost:4000/api/auth/login',value)
  }
  
  register(value:any){
    let user = value;
    return this.http.post<any>('http://localhost:4000/api/auth/register',user)
  }

  getProfile(id:string){
    return this.http.get<{user:[User],message:string}>(`http://localhost:4000/api/user/${id}`)

  }
}
