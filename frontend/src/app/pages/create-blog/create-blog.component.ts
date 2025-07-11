import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule]
})
export class CreateBlogComponent implements OnInit {
  blogForm!: FormGroup;
  submitting = false;
 
  constructor(private fb: FormBuilder,private blogService:BlogService) {}

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      status: ['draft', Validators.required],
      tags: this.fb.array([])
    });
  }

  get tags(): FormArray {
    return this.blogForm.get('tags') as FormArray;
  }

  addTag(tag: string): void {
    if (tag && !this.tags.value.includes(tag)) {
      this.tags.push(this.fb.control(tag));
    }
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  onSubmit(): void {
    if (this.blogForm.invalid) return;

    this.submitting = true;
    let blogData = this.blogForm.value;


    this.blogService.createBlog(blogData).subscribe(data =>{
      blogData = data;
      this.blogForm.reset({ status: 'draft' });
      this.tags.clear();
      this.submitting = false;
    })
    // Simulate API call
    // setTimeout(() => {
    //   console.log('Blog created:', blogData);
    //   this.blogForm.reset({ status: 'draft' });
    //   this.tags.clear();
    //   this.submitting = false;
    // }, 1500);
  }
}
