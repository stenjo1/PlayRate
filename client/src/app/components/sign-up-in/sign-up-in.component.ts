import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sign-up-in',
  templateUrl: './sign-up-in.component.html',
  styleUrls: ['./sign-up-in.component.css']
})
export class SignUpInComponent {

  user: User;
  displayLogin: boolean = true;

  constructor(){
    this.user = new User("","","");
  }

  onSignUp(){
    this.displayLogin = true;
  }

  onLogIn(){
    this.displayLogin = false;
  }

}
