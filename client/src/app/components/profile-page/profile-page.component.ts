import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  user: User;

  constructor(){
    this.user = new User("Prophethor", "prophethor@gmail.com", "", "/assets/profile-default.png", "Online");
  }
}
