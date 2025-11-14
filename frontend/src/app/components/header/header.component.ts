import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  user!:any;
  constructor(private router:Router,private auth:AuthService){}
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')||'{}');
  }



  goToPage(url:string){
    this.router.navigate([url]);
  }
  goToProfile(){
    this.router.navigate(['/profile/',this.user._id])
  }
  logout(){
    localStorage.clear();
    this.goToPage('/auth/login');
  }
}
