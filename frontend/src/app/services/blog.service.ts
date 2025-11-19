import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
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

  getAllBlogs(page: number, limit: number){
    return this.http.get<any>(`${this.baseUrl}/api/blogs?page=${page}&limit=${limit}`)
  }

  createBlog(values:any){
    return this.http.post<Blog>(`${this.baseUrl}/api/blogs/`,values).pipe(
    )
  }
  deleteBlog(values:any){
    if(!values._id)return;
    return this.http.delete<any>(`${this.baseUrl}/api/blogs/${values._id}`).subscribe(data=>{
      console.log('Blog deleted',data);
    })
  }

  getBlogById(id:string){
    return this.http.get<any>(`${this.baseUrl}/api/blogs/${id}`).pipe(
      shareReplay(1)
    )
  }
}
