import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  title = 'PlayRate';
  public user: Observable<User> = new Observable<User>();
  public username?: string | null;
  constructor(private userService:UserService){
    this.userService.getUserByUsername(this.userService.getCurrentUserUsername()).subscribe(u=>{
      this.username=u.username;
    });
  }
  ngOnInit(): void {

  }
}
