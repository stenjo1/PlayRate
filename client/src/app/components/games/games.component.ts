import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {

  public games: Observable<Game[]>;

  constructor(private gameService:GamesService, private router : Router){
    this.games = this.gameService.getGamesArray();
    
  }

}

