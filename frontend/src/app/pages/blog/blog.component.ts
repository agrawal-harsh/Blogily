import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentSectionComponent } from "../../components/comment-section/comment-section.component";
import { BlogService } from '../../services/blog.service';
import { CommentService } from '../../services/comment.service';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, CommentSectionComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  blog: any;
  liked = false;

  constructor(private route: ActivatedRoute,private router:Router,private blogService:BlogService,private commentService:CommentService,private likeService:LikeService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.blogService.getBlogById(id).subscribe(data=>{
      this.blog = data.blog;
      this.liked = data.blog.isLiked;
    })
  }
  viewProfile(){
    this.router.navigate(['/profile/',this.blog.author_id])
  }

  addComment(content:string){
    const id = this.route.snapshot.params['id'];
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth/login']);
      return;
    }

    let newComment;
    this.commentService.addComment(content,id).subscribe(data => {
      newComment = data.comment;
      this.blog.comments = [...this.blog.comments,newComment];
    });
  }

  likeBlog(){
    const id = this.route.snapshot.params['id'];
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.likeService.likeBlog(id).subscribe(
   {
    next:()=>{
      if(this.liked){
        this.blog.like_count = --this.blog.like_count;
      }else{
        this.blog.like_count = ++this.blog.like_count;
      }
      this.liked = !this.liked;
    }
   }
    )

  }
}
