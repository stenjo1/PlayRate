import { Component } from '@angular/core';
import { User,User1 } from 'src/app/models/user.model'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  user: User1;

  finishedCount() {
    return this.user.finished.length;
  }

  playingCount() {
    return this.user.playing.length;
  }

  backlogCount() {
    return this.user.backlog.length;
  }

  reviewCount() {
    return this.user.reviews.length;
  }

  constructor(){
    //TOFIX: I've instanced wrong user class because it doesent match current one
    this.user = new User1("Prophethor", "prophethor@gmail.com", "", "/assets/profile-default.png", "Online", [1,2,3],[1,2],[2,3],[]);
  }
}
