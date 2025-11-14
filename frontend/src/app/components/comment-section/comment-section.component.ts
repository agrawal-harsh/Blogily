import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Comment {
  _id: string;
  user_id: string;
  content: string;
  createdAt: string;
  user:any;
}

@Component({
  selector: 'app-comment-section',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit,OnChanges {
  @Input() comments: Comment[] = [];
  currentUserId: string = JSON.parse(localStorage.getItem('user')||"{}")._id;
  @Output() addComment = new EventEmitter<string>();

   public form!: FormGroup;
   submitted = false;

  constructor(private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
  }

   public ngOnInit() {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

   public get f() { return this.form.controls; }

   public onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.addComment.emit(this.form.value.content);
    this.form.reset();
    this.submitted = false;
  }
}
