import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GamesService } from '../../services/games.service'
import { Post, PostType } from "../../models/post.model"
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnDestroy {

  public games;
  review: boolean = false;
  createPostForm: FormGroup;
  private activeSubscriptions: Subscription[] = [];

  constructor(private gameService: GamesService, private postService: PostsService, private userService: UserService, private formBuilder: FormBuilder){
    this.createPostForm = this.formBuilder.group({
      game: ['', [Validators.required]],
      reviewScore: ['', []],
      reviewText: ['', []]
    });

    this.games = this.gameService.getGamesArray();
  }

  public ngOnDestroy(): void {
    this.activeSubscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
  
  onSelectedType(event: Event): void {
    this.review = (<HTMLSelectElement>event.target).value==="review";
  }

  onCreatePostFormSubmit() {

    const gameId = this.createPostForm.get("game")?.value.gameId;
    const gameName = this.createPostForm.get("game")?.value.gameName;
    const username = this.userService.getCurrentUserUsername();

    const reviewText =  this.createPostForm.get("reviewText")?.value;
    const reviewScore =  this.createPostForm.get("reviewScore")?.value;
    
    
    const postsSub = this.postService.createNewPost(PostType.Review, gameId, gameName, username, reviewText, reviewScore).subscribe((post)=>{
        const gamesSub = this.gameService.attachPost(gameId, post._id, reviewScore).subscribe();
        this.activeSubscriptions.push(gamesSub);
        const userSub = this.userService.putAPost(post._id).subscribe(); 
        this.activeSubscriptions.push(userSub);
        
    });
    this.activeSubscriptions.push(postsSub);
    
  }
}
