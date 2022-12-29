import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';
import { UserService } from 'src/app/services/user.service';
import { PostsService } from 'src/app/services/posts.service';
import { PostType } from 'src/app/models/post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';


declare const $:any;

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnDestroy{

  public game:Observable<Game>=new Observable<Game>();
  public reviews:any;

  private activeSubscriptions: Subscription[] = [];

  constructor(private activatedRoute:ActivatedRoute,private gameService:GamesService, private userService:UserService, private postsService:PostsService){
    
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
      const gameId:string | null=params.get('gameId');
      this.game=this.gameService.getGameById((gameId)!); 
      this.reviews = this.gameService.getGameReviews(gameId!);
    })

    
  }

  ngOnDestroy(): void {
    this.activeSubscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
  
  addToFinishedOnClick(): void{
    const sub = this.game.subscribe((g)=>{
      const obs : Observable<{token : string}>  = this.userService.putFinishedGame(g._id);
      const userSub = obs.subscribe();
      const postSub = this.postsService.createNewPost(PostType.Playing ,g._id, g.name, this.userService.getCurrentUserId(), "", 0).subscribe((postId)=>{
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
      const postSub = this.postsService.createNewPost(PostType.Playing ,g._id, g.name, this.userService.getCurrentUserId(), "", 0).subscribe((postId)=>{
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
      const postSub = this.postsService.createNewPost(PostType.Backlog ,g._id, g.name, this.userService.getCurrentUserId(), "", 0).subscribe((postId)=>{
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
      const postSub = this.postsService.createNewPost(PostType.Review ,g._id, g.name, this.userService.getCurrentUserId(), reviewText, reviewScore).subscribe((postId)=>{
        const gamesSub = this.gameService.attachPost(g._id, postId, 0).subscribe();
        this.activeSubscriptions.push(gamesSub);
        const userSub = this.userService.putAPost(postId).subscribe();
        this.activeSubscriptions.push(userSub);
    });
      this.activeSubscriptions.push(sub, postSub, userSub);
    })
  }
}
