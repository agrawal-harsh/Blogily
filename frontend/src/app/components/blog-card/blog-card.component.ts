import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../../interfaces/blog.interface';

@Component({
  selector: 'app-blog-card',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent {
  constructor(private router:Router){}
  @Input() blog!: Blog;
  
  public  goToBlog(){
    this.router.navigate(['/blog/',this.blog._id])
  }
}
