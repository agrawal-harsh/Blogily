import { Component, input, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../../interfaces/blog.interface';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../../services/shorten.pipe';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  standalone:true,
  imports:[CommonModule,ShortenPipe],
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent {
  constructor(private router:Router){}
  @Input() layout: 'side' | 'top' = 'top';
  @Input() blog!: Blog;
  @Input() len:number = 80;
  public  goToBlog(){
    this.router.navigate(['/blog/',this.blog._id])
    console.log(this.blog)
  }
}
