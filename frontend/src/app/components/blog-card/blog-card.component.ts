import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../../interfaces/blog.interface';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../../services/shorten.pipe';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  templateUrl: './blog-card.component.html',
  imports: [CommonModule, ShortenPipe],
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent {

  @Input() layout: 'side' | 'top' = 'top';
  @Input() blog: Blog = {} as Blog;
  @Input() len: number = 80;
  @Input() isProfilePage: boolean = false;
  @Input() user: any = null;

  loggedInUserId: string | null = null;

  constructor(private router: Router, private blogService: BlogService) {
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedInUserId = JSON.parse(user)._id;
    }
  }

  public goToBlog() {
    this.router.navigate(['/blog', this.blog._id]);
  }

  isOwner(): boolean {
    return this.loggedInUserId === this.user?._id;
  }

  editBlog() {
    this.router.navigate(['/blog/edit', this.blog._id]);
  }

  deleteBlog() {
    this.blogService.deleteBlog(this.blog);
    window.location.reload();
  }
}
