import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  getComments(){}

  addComment(content:string,id:string){
    console.log(content,id)
    return this.http.post<any>(`http://localhost:4000/api/comments/${id}`,{content})
  }
}
