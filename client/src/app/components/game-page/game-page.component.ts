import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';
import { UserService } from 'src/app/services/user.service';
import { PostsService } from 'src/app/services/posts.service';
import { PostType } from 'src/app/models/post.model';


declare const $:any;

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnDestroy{

  public game:Observable<Game>=new Observable<Game>;
  public reviews;

  private activeSubscriptions: Subscription[] = [];

  constructor(private gameService:GamesService, private userService:UserService, private postsService:PostsService){
    const gameId = "63a3219fcc33994091970416"; //kako ovde da dobijemo id trenutne igre
    this.game=this.gameService.getGameById(gameId);  
    this.reviews = this.gameService.getGameReviews(gameId);
  }

  ngOnDestroy(): void {
    this.activeSubscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
  
  addToFinishedOnClick(): void{
    const sub = this.game.subscribe((g)=>{
      const obs : Observable<{token : string}>  = this.userService.putFinishedGame(g._id);
      const userSub = obs.subscribe();
      const postSub = this.postsService.createNewPost(PostType.Playing ,g._id, this.userService.getCurrentUserId(), "", 0).subscribe((postId)=>{
        const gamesSub = this.gameService.attachPost(g._id, postId, 0).subscribe();
        this.activeSubscriptions.push(gamesSub);
        const userSub = this.userService.putAPost(postId).subscribe();
        this.activeSubscriptions.push(userSub);
    });
      this.activeSubscriptions.push(sub, postSub, userSub);

    })
  }

  addToPlayingOnClick(): void{
    const sub = this.game.subscribe((g)=>{
      const obs : Observable<{token : string}>  = this.userService.putPlayingGame(g._id);
      const userSub = obs.subscribe();
      const postSub = this.postsService.createNewPost(PostType.Playing ,g._id, this.userService.getCurrentUserId(), "", 0).subscribe((postId)=>{
        const gamesSub = this.gameService.attachPost(g._id, postId, 0).subscribe();
        this.activeSubscriptions.push(gamesSub);
        const userSub = this.userService.putAPost(postId).subscribe();
        this.activeSubscriptions.push(userSub);
    });
      this.activeSubscriptions.push(sub, postSub, userSub);
    })
  }

  addToBacklogOnClick(): void{
     const sub = this.game.subscribe((g)=>{
      const obs : Observable<{token : string}>  = this.userService.putBacklogGame(g._id);
      const userSub = obs.subscribe();
      const postSub = this.postsService.createNewPost(PostType.Backlog ,g._id, this.userService.getCurrentUserId(), "", 0).subscribe((postId)=>{
        const gamesSub = this.gameService.attachPost(g._id, postId, 0).subscribe();
        this.activeSubscriptions.push(gamesSub);
        const userSub = this.userService.putAPost(postId).subscribe();
        this.activeSubscriptions.push(userSub);
    });
      this.activeSubscriptions.push(sub, postSub, userSub);
    })
  }

  reviewOnClick(): void{
    //
    let reviewText: string;
    let reviewScore: number;
    const sub = this.game.subscribe((g)=>{
      const obs : Observable<{token : string}>  = this.userService.putBacklogGame(g._id);
      const userSub = obs.subscribe();
      const postSub = this.postsService.createNewPost(PostType.Review ,g._id, this.userService.getCurrentUserId(), reviewText, reviewScore).subscribe((postId)=>{
        const gamesSub = this.gameService.attachPost(g._id, postId, 0).subscribe();
        this.activeSubscriptions.push(gamesSub);
        const userSub = this.userService.putAPost(postId).subscribe();
        this.activeSubscriptions.push(userSub);
    });
      this.activeSubscriptions.push(sub, postSub, userSub);
    })
  }
}
