import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http:HttpClient) { }

  likeBlog(id:string){
    return this.http.patch(`http://localhost:4000/api/likes/${id}`,'');
  }
}
