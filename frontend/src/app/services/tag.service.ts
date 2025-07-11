import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http:HttpClient) { }

  getAllTags(){
    return this.http.get<any>('http://localhost:4000/api/tags/static');
  }

  searchByTag(tags: string[]) {
    return this.http.get<{blogs:Blog[]}>('http://localhost:4000/api/tags', {
      params: { tags: tags.join(',') }
    });
  }
}
