import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl: string;

  constructor(private http:HttpClient,private config: ConfigService) {
    this.baseUrl = this.config.apiBaseUrl;
  }

  getComments(){
    return this.http.get<any>(`${this.baseUrl}/api/comments/`);
  }

  addComment(content:string,id:string){
    console.log(content,id)
    return this.http.post<any>(`${this.baseUrl}/api/comments/${id}`,{content})
  }
}
