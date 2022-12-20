import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User,User1 } from 'src/app/models/user.model'
import { UserService , GameResponse} from 'src/app/services/user.service';

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

  constructor(userService : UserService){
    //TOFIX: I've instanced wrong user class because it doesent match current one
    const obs : Observable<GameResponse | null>  = userService.getGames();
    obs.subscribe();

    this.user = new User1("Prophethor", "prophethor@gmail.com", "", "/assets/profile-default.png", "Online", [1,2,3],[1,2],[2,3],[]);
  }
}
