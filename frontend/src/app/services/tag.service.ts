import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../interfaces/blog.interface';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private baseUrl: string;

  constructor(private http:HttpClient,private config: ConfigService) {
    this.baseUrl = this.config.apiBaseUrl;
  }

  getAllTags(){
    return this.http.get<any>(`${this.baseUrl}/api/tags/static`);
  }

  searchByTag(tags: string[]) {
    return this.http.get<{blogs:Blog[]}>(`${this.baseUrl}/api/tags`, {
      params: { tags: tags.join(',') }
    });
  }
}
