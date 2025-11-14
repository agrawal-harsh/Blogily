import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private baseUrl: string;

  constructor(private http:HttpClient,private config: ConfigService) {
    this.baseUrl = this.config.apiBaseUrl;
  }

  likeBlog(id:string){
    return this.http.patch(`${this.baseUrl}/api/likes/${id}`,'');
  }
}
