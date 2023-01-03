import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model'
import { UserService , GameResponse} from 'src/app/services/user.service';
import { Game } from 'src/app/models/game.model';
import { Post, PostType } from 'src/app/models/post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  public user: Observable<User> = new Observable<User>();
  public finishedGames: Game[] | undefined;
  public playingGames: Game[] | undefined;
  public backlogGames: Game[] | undefined;
  public reviewedGames: Game[] | undefined;
  public posts: Post[] = new Array<Post>();
  
  public showPopup:boolean = false;
  public typeToShow:PostType = PostType.NoType;

  public username?: string | null;

  constructor(private activatedRoute:ActivatedRoute,private userService:UserService, private gamesService:GamesService){
   
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
      this.username=params.get('userName');
    });

    this.userService.getGames(this.getUsername()).subscribe((games)=> {
      this.finishedGames = games?.finishedGames;
      this.playingGames = games?.playingGames;
      this.backlogGames = games?.backlogGames;
    });

    this.posts = this.userService.getPostsByUsername(this.getUsername());

    this.posts.filter((post) => post.postType === PostType.Review).map((post) => this.gamesService.getGameById(post.gameId).subscribe((game) => {
        this.reviewedGames?.push(game)
      }));
  }

  getUsername(): string {
    if(this.username)
      return this.username;
    else
      return this.userService.getCurrentUserUsername();
  }

  finishedCount() {
    const count = (this.finishedGames !== undefined) ? this.finishedGames.length : 0;
    return count;
  }

  playingCount() {
    const count = (this.playingGames !== undefined) ? this.playingGames.length : 0;
    return count;
  }

  backlogCount() {
    const count = (this.backlogGames !== undefined) ? this.backlogGames.length : 0;
    return count;
  }

  reviewCount() {
    const count = (this.reviewedGames !== undefined) ? this.reviewedGames.length : 0;
    return count;
  }

  showFinished() {
    this.typeToShow = PostType.Finished;
    this.showPopup = true;
  }

  showPlaying() {
    this.typeToShow = PostType.Playing;
    this.showPopup = true;
  }

  showBacklog() {
    this.typeToShow = PostType.Backlog;
    this.showPopup = true;
  }

  showReviewed() {
    this.typeToShow = PostType.Review;
    this.showPopup = true;
  }

}
