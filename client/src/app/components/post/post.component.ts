import { Component, Input, OnDestroy,OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GamesService } from 'src/app/services/games.service';
import { Post, PostType } from '../../models/post.model';
import { UserService } from '../../services/user.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnDestroy,OnInit{
  @Input() public post!: Post; 
  public avatarUrl?: Observable<string>;

  public currentUsername: string;
  public editMode: boolean;
  private activeSubscriptions: Subscription[] = [];
  public show;
  

  public constructor(private userService: UserService, private gamesService: GamesService, private postService: PostsService) {
    this.currentUsername = userService.getCurrentUserUsername();
    this.editMode = false;
    this.show=true;
    
   
  }
  ngOnInit(): void {
    this.avatarUrl=this.userService.getImgUrl(this.post.username);
  }
  ngOnDestroy(): void {
    this.activeSubscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }



  public editHandler(): void {
    this.editMode = !this.editMode;
  }

  public saveChangesHandler(): void{
    this.editMode = false;    
    console.log(this.post.reviewText, this.post.reviewScore);
    const postSub = this.postService.editReview(this.post._id, this.post.reviewText, this.post.reviewScore).subscribe();
    this.activeSubscriptions.push(postSub);
  }


  public deleteHandler(): void {
    const id = this.post._id;

    const postSub = this.postService.deletePost(id).subscribe((tokenPost) => {
      if(tokenPost.token !== 'error') {
        const userSub = this.userService.deleteAPost(id).subscribe((tokenUserPost) => {
          if(tokenUserPost.token !== 'error') {
            switch(this.post.postType){
              case PostType.Backlog:
                const deleteFromBacklog = this.userService.deleteBacklogGame(this.post.gameId).subscribe((tokenBacklog) => {
                  if(tokenBacklog.token !== 'error') {
                    this.show=false;
                    this.activeSubscriptions.push(postSub, userSub, deleteFromBacklog);
                  }
                });
                break;
              case PostType.Playing:
                const deleteFromPlaying = this.userService.deletePlayingGame(this.post.gameId).subscribe((tokenPlaying) => {
                  if(tokenPlaying.token !== 'error') {
                    this.show=false;
                    this.activeSubscriptions.push(postSub, userSub, deleteFromPlaying);
                  }
                });
                break;
              case PostType.Finished:
                const deleteFromFinished = this.userService.deleteFinishedGame(this.post.gameId).subscribe((tokenFinished) => {
                  if(tokenFinished.token !== 'error') {
                    this.show=false;
                    this.activeSubscriptions.push(postSub, userSub, deleteFromFinished);
                  }
                });
                break;
              case PostType.Review:
                const deleteFromReview = this.userService.deleteReviewedGame(this.post.gameId).subscribe((tokenReview) => {
                  if(tokenReview.token !== 'error') {
                    this.show=false;
                    this.activeSubscriptions.push(postSub, userSub, deleteFromReview);
                  }
                });
                break;
            }
          }
        });
      }
      });
  }

}
