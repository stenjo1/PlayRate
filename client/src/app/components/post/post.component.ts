import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GamesService } from 'src/app/services/games.service';
import { Post } from '../../models/post.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input()
  public post!: Post;  //povezati ovo polje sa htmlovima
  @Input()
  public reviewText: string | undefined;
  @Input()
  public rating: number | undefined;
  public currentUsername: string;
  public editMode: boolean;

  public editHandler(): void {
    this.editMode = !this.editMode;
  }

  public saveChangesHandler(): void{
    this.editMode = false;    
    console.log(this.reviewText);
    console.log(this.rating);
  }

  public constructor(private userService: UserService, private gamesService: GamesService) {
    this.currentUsername = userService.getCurrentUserUsername();
    this.editMode = false;
  }
}
