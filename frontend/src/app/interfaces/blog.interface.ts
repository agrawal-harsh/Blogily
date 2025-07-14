export interface Blog {
  _id: string;
  title: string;
  content: string;
  author_id?: string;
  author_name?: string;
  author_picture?: string;
  createdAt: string;
  status?:string;
  views_count: string;
  tags?: { name: string }[];
  coverImage?: string;
  author?:any
}