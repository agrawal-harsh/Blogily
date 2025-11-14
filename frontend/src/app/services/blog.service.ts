import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { Blog } from '../interfaces/blog.interface';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl: string;

  constructor(private http:HttpClient,private config: ConfigService) {
    this.baseUrl = this.config.apiBaseUrl;
  }

  getAllBlogs(){
    return this.http.get<any>(`${this.baseUrl}/api/blogs/`).pipe(
      shareReplay(1)
    )
  }

  createBlog(values:any){
    return this.http.post<Blog>(`${this.baseUrl}/api/blogs/`,values).pipe(
    )
  }

  getBlogById(id:string){
    return this.http.get<any>(`${this.baseUrl}/api/blogs/${id}`).pipe(
      shareReplay(1)
    )
  }
}
