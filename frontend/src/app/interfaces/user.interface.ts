import { Blog } from "./blog.interface";

export interface User {
  _id: string;
  username: string;
  email: string;
  full_name: string;
  bio?: string;
  profile_picture?: string;
  is_active: boolean;
  blogs:Blog[];
}