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
  public currentUsername: string;

  public constructor(private userService: UserService, private gamesService: GamesService) {
    this.currentUsername = userService.getCurrentUserUsername();
    // u htmlu raditi ngIf da li je current username i username u postu isti,
    // ako jeste onda prikazati tri tackice za edit i delete, inace ne
  }
}
