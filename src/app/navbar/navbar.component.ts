import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  User:any;

  constructor(private auth: AuthService, private router: Router) { 
    this.User = localStorage.getItem('user');
  }

  ngOnInit() {
  }

  logOut(){
  	 this.auth.logout();
  	 this.router.navigate(['']);
  }
}
