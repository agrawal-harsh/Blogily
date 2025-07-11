import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { Blog } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) {}

  getAllBlogs(){
    return this.http.get<any>('http://localhost:4000/api/blogs/').pipe(
      tap(data=>console.log(data)),
      shareReplay(1)
    )
  }

  createBlog(values:Blog){
    return this.http.post<Blog>('http://localhost:4000/api/blogs/',values).pipe(
      tap(data=>console.log(data))
    )
  }

  getBlogById(id:string){
    return this.http.get<any>(`http://localhost:4000/api/blogs/${id}`).pipe(
      shareReplay(1)
    )
  }
}
