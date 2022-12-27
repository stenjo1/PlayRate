import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  title = 'PlayRate';
  public user: Observable<User> = new Observable<User>();
  public username?: string | null;
  
  constructor(private userService:UserService, private authService : AuthService, private router : Router){
    this.userService.getUserByUsername(this.userService.getCurrentUserUsername()).subscribe(u=>{
      this.username=u.username;
    });
  }
  ngOnInit(): void {

  }

  isLoggedIn() : boolean {
    return this.authService.userLoggedIn;
  }

  logoutUser() : void {
    this.authService.logoutUser();
    this.router.navigateByUrl("");
  }


}
