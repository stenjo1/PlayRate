import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model'
import { UserService} from 'src/app/services/user.service';
import { Game } from 'src/app/models/game.model';
import { Post, PostType } from 'src/app/models/post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import { PostsService } from 'src/app/services/posts.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnDestroy{
  public user: Observable<User> = new Observable<User>();
  public finishedGames: Game[] = [];
  public playingGames: Game[] = [];
  public backlogGames: Game[] = [];
  public reviewedGames: Game[] = [];
  public posts: Post[] = new Array<Post>();
  
  public showPopup:boolean = false;
  public gamesToShow: Game[] | undefined;

  public changeURLFormShown:boolean = false;
  public changeURLForm:FormGroup;

  public username?: string | null;
  public currentUserUsername?: string | null;
  public imgUrl?: string | null;

  private activeSubscriptions: Subscription[] = [];

  constructor(private activatedRoute:ActivatedRoute,private userService:UserService, private postService:PostsService, private formBuilder: FormBuilder){
   
    const sub = this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
      this.username=params.get('userName');
    });

    this.currentUserUsername = this.userService.getCurrentUserUsername();

    const finishedSub = this.userService.getFinishedGames(this.getUsername()).subscribe((finishedGames) => {
      this.finishedGames = finishedGames;
    })
    const playingSub = this.userService.getPlayingGames(this.getUsername()).subscribe((playingGames) => {
      this.playingGames = playingGames;
    })
    const backlogSub = this.userService.getBacklogGames(this.getUsername()).subscribe((backlogGames) => {
      this.backlogGames = backlogGames;
    })
    const reviewSub  = this.userService.getReviewedGames(this.getUsername()).subscribe((reviewedGames) => {
      this.reviewedGames = reviewedGames;
    })
    
    this.posts = this.userService.getPostsByUsername(this.getUsername());
    
    const imgSub = this.userService.getImgUrl(this.getUsername()).subscribe((imgUrl) => (imgUrl !== '') ? this.imgUrl = imgUrl : this.imgUrl = 'assets/profile-default.png');

    this.activeSubscriptions.push(imgSub, reviewSub, backlogSub, playingSub, finishedSub, sub);
    
    this.changeURLForm = this.formBuilder.group({
      imgURLToSet: ['', []]
    });
  }
  ngOnDestroy(): void {
    this.activeSubscriptions.forEach((sub: Subscription) => sub.unsubscribe());
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
    if(this.gamesToShow === this.finishedGames && this.showPopup === true) {
      this.showPopup = false;
    }
    else {
      this.gamesToShow = this.finishedGames;
      this.showPopup = true;
    }
  }

  showPlaying() {
    if(this.gamesToShow === this.playingGames && this.showPopup === true) {
      this.showPopup = false;
    }
    else {
      this.gamesToShow = this.playingGames;
      this.showPopup = true;
    }
  }

  showBacklog() {
    if(this.gamesToShow === this.backlogGames && this.showPopup === true) {
      this.showPopup = false;
    }
    else {
      this.gamesToShow = this.backlogGames;
      this.showPopup = true;
    }
  }

  showReviewed() {
    if(this.gamesToShow === this.reviewedGames && this.showPopup === true) {
      this.showPopup = false;
    }
    else {
      this.gamesToShow = this.reviewedGames;
      this.showPopup = true;
    }
  }

  showChangeURLForm() {
    this.changeURLFormShown = !this.changeURLFormShown;
  }


  onDeletedPost(deletedPost: Post){
    this.posts = this.posts.filter(post=>post._id!=deletedPost._id);
    switch(deletedPost.postType){
      case PostType.Review:
        this.reviewedGames = this.reviewedGames.filter(game=>game._id!=deletedPost.gameId);
        break;
      case PostType.Playing:
        this.playingGames = this.playingGames.filter(game=>game._id!=deletedPost.gameId);
        break; 
      case PostType.Backlog:
        this.backlogGames = this.backlogGames.filter(game=>game._id!=deletedPost.gameId);
        break;
      case PostType.Finished:
        this.finishedGames = this.finishedGames.filter(game=>game._id!=deletedPost.gameId);
        break; 
        
    }
  }

  changeImgUrl() {
    const imgUrl = this.changeURLForm.get("imgURLToSet")?.value;
    const sub = this.userService.setImgUrl(this.getUsername(), imgUrl).subscribe();
    this.activeSubscriptions.push(sub);
  }

}
