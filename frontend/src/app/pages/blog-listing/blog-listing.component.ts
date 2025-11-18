import { Component, OnInit } from '@angular/core';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { BlogService } from '../../services/blog.service';
import { TagService } from '../../services/tag.service';
import { Blog } from '../../interfaces/blog.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-blog-listing',
  standalone: true,
  imports: [BlogCardComponent, ReactiveFormsModule, CommonModule, InfiniteScrollModule],
  templateUrl: './blog-listing.component.html',
  styleUrl: './blog-listing.component.css'
})
export class BlogListingComponent implements OnInit {

  page = 1;
  limit = 10;
  loading = false;
  finished = false;
  constructor(private blogService: BlogService, private tagService: TagService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      search: ['']
    });
    this.loadBlogs();
    this.tagService.getAllTags().subscribe(tags => {
      this.categories = tags.tags;
    })
  }
  blogs: Blog[] = [
    {
      "_id": "607f1f77bcf86cd799439031",
      "author_id": "507f1f77bcf86cd799439011",
      "title": "The Future of AI in Web Development",
      "content": "Artificial Intelligence is revolutionizing web development in unprecedented ways. From automated code generation to intelligent user interfaces, AI is reshaping how we build and interact with web applications.",
      "status": "published",
      "views_count": "1250",
      "createdAt": "2024-06-15T10:30:00Z",
    },
    {
      "_id": "607f1f77bcf86cd799439032",
      "author_id": "507f1f77bcf86cd799439012",
      "title": "10 Mediterranean Recipes for Summer",
      "content": "Discover the vibrant flavors of the Mediterranean with these fresh and healthy summer recipes. From Greek salads to Italian pasta dishes, these recipes will transport you to the sunny shores of the Mediterranean.",
      "status": "published",
      "views_count": "890",
      "createdAt": "2024-06-14T14:20:00Z",
    },
    {
      "_id": "607f1f77bcf86cd799439033",
      "author_id": "507f1f77bcf86cd799439013",
      "title": "Hidden Gems of Southeast Asia",
      "content": "Explore the lesser-known destinations in Southeast Asia that offer incredible experiences away from the tourist crowds. From secluded beaches to ancient temples, these hidden gems are waiting to be discovered.",
      "status": "published",
      "views_count": "2100",
      "createdAt": "2024-06-13T09:15:00Z",
    },
    {
      "_id": "607f1f77bcf86cd799439034",
      "author_id": "507f1f77bcf86cd799439014",
      "title": "Building Core Strength: A Beginner's Guide",
      "content": "Core strength is fundamental to overall fitness and daily activities. This comprehensive guide covers the best exercises, proper form, and progression strategies for building a strong and stable core.",
      "status": "published",
      "views_count": "1560",
      "createdAt": "2024-06-12T16:45:00Z",
    },
    {
      "_id": "607f1f77bcf86cd799439035",
      "author_id": "507f1f77bcf86cd799439015",
      "title": "Book Review: The Seven Moons of Maali Almeida",
      "content": "Shehan Karunatilaka's Booker Prize-winning novel is a masterpiece of magical realism that explores themes of war, identity, and redemption in post-colonial Sri Lanka. This review delves into the book's complex narrative structure and powerful themes.",
      "status": "published",
      "views_count": "750",
      "createdAt": "2024-06-11T11:30:00Z",
    },
    {
      "_id": "607f1f77bcf86cd799439036",
      "author_id": "507f1f77bcf86cd799439016",
      "title": "Digital Art Trends in 2024",
      "content": "The digital art world continues to evolve with new technologies and creative approaches. From NFT art to AI-generated pieces, explore the trends shaping the digital art landscape in 2024.",
      "status": "published",
      "views_count": "980",
      "createdAt": "2024-06-10T13:20:00Z",
    },];
  blogsCopy: Blog[] = this.blogs;

  public form!: FormGroup;

  searchTags: any[] = [];


  public get f() { return this.form.controls; }
  categories: any = ["Technology", "Fashion", "Web Development"]
  showTagList = false;

  
  
  loadBlogs() {
    if (this.loading) return;
    this.loading = true;

    this.blogService.getAllBlogs(this.page, this.limit).subscribe((res: any) => {
      if(res.blogs.length === 0){
        this.finished = true;
        this.loading = false;
        return;
      }
      this.blogs = [...this.blogs,...res.blogs];
      this.blogsCopy = this.blogs;
      this.page++;
      this.loading = false;
    });
  }
  tagListToggle() {
    this.showTagList = !this.showTagList;
  }
  searchByTitle() {
    const title = this.form.value.search;
    this.blogs = this.blogsCopy.filter(blog => blog.title.toLowerCase().includes(title.toLowerCase()));
  }
  addTag(category: any, li: HTMLLIElement) {
    if (li.classList.contains('btn-secondary')) {
      this.searchTags = this.searchTags.filter(tag => tag._id !== category._id);
      li.classList.remove('btn-secondary');
      li.classList.add('btn-outline-secondary');
    } else {
      this.searchTags.push(category);
      li.classList.add('btn-secondary');
      li.classList.remove('btn-outline-secondary');
    }
    const tags = this.searchTags.map(tags => tags.name);
    this.tagService.searchByTag(tags).subscribe(response => {
      this.blogs = response.blogs;
      this.blogsCopy = response.blogs;
    })
  }
  
trackById(index: number, item: any) {
  return item.id ?? index;
}
}
