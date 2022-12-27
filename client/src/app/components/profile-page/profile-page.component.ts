import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model'
import { UserService , GameResponse} from 'src/app/services/user.service';
import { Game } from 'src/app/models/game.model';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  public posts: Observable<Post[]> = new Observable<Post[]>();

  public username?: string | null;

  constructor(private activatedRoute:ActivatedRoute,private userService:UserService, private postsService:PostsService){
   
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
      this.username=params.get('userName');
    });

    this.userService.getGames().subscribe((games)=> {
      this.finishedGames = games?.finishedGames;
      this.playingGames = games?.playingGames;
      this.backlogGames = games?.backlogGames;
    });
  }

  getUsername(): string {
    if(this.username)
      return this.username;
    else
      return "";
  }

  finishedCount() {
    const count = this.finishedGames?.length;
    return count;
  }

  playingCount() {
    const count = this.playingGames?.length;
    return count;
  }

  backlogCount() {
    const count = this.backlogGames?.length;
    return count;
  }

  reviewCount() {
    let count = 0;
    this.posts.subscribe((posts) => {
      posts.forEach((post) => {
        if(post.postType === "Review") count += 1;
      })
    })
    return count;
  }

}
