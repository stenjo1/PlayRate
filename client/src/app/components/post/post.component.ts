import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input()
  public post: Post | undefined;  //povezati ovo polje sa profile-page html i home-page html pa obrisati undefined
  currentUserId: string;

  public constructor(private userService: UserService) {
    this.currentUserId = userService.getCurrentUserId();
    // u htmlu raditi ngIf da li je current user i userId u postu isti,
    // ako jeste onda prikazati tri tackice za edit i delete, inace ne
  }
}
