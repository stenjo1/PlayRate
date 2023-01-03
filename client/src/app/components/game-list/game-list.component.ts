import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { Post, PostType } from 'src/app/models/post.model';
import { GamesService } from 'src/app/services/games.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
  @Input()
  typeToShow! : PostType;
  @Input()
  username! : string;

  games: Game[] | undefined;

  constructor(private userService:UserService, private gamesService:GamesService) {
    this.userService.getPostsByUsername(this.username).filter((post)=> post.postType === this.typeToShow).map((post) => this.gamesService.getGameById(post.gameId).subscribe((game) => {
        this.games?.push(game)
      }));
  }

  getGamesToShow() {
    return this.games;
  }
}
