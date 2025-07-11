import { Routes } from '@angular/router';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogListingComponent } from './pages/blog-listing/blog-listing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateBlogComponent } from './pages/create-blog/create-blog.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path:'',
        component:BlogListingComponent
    },{
        path:'blog/:id',
        component:BlogComponent
    },{
        path:'blog',
        canActivate: [authGuard],
        component:CreateBlogComponent
    },{
        path:'auth/login',
        component:LoginComponent
    },{
        path:'profile/:id',
        canActivate: [authGuard],
        component:ProfileComponent
    },{
        path:'auth/register',
        component:RegisterComponent
    }
];
