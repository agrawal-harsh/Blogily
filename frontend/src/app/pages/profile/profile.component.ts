import { Component, OnInit } from '@angular/core';
import { Blog } from '../../interfaces/blog.interface';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

interface User {
  _id: string;
  username: string;
  email: string;
  full_name: string;
  bio?: string;
  profile_picture?: string;
  is_active: boolean;
}

@Component({
  selector: 'app-profile',
  standalone:true,
  imports:[CommonModule,BlogCardComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;
  userBlogs: Blog[] = [];

  constructor(private auth:AuthService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')||"{}");
    this.userBlogs = [
      {
        _id: '607f1f77bcf86cd799439036',
        title: 'Digital Art Trends in 2024',
        content: 'The digital art world continues to evolve with new technologies...',
        author_name: this.user.full_name,
        author_picture: this.user.profile_picture,
        createdAt: '2024-06-10T13:20:00.000Z',
        views_count: '980',
        tags: [{ name: 'Art & Design' }, { name: 'Technology' }],
        coverImage: 'https://via.placeholder.com/600x400'
      },
    ];
    const id = this.route.snapshot.params['id'];
    this.auth.getProfile(id).subscribe(data=>{
      this.userBlogs = data.user[0].blogs;
      this.user = data.user[0];
    });
  }
  get totalViews(): number {
  return this.userBlogs?.reduce((sum, b) => sum + (+b.views_count), 0) || 0;
}
}
