import { Component, Input } from '@angular/core';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @Input()
  public post: Game | undefined;  //povezati ovo polje sa htmlovima

  public constructor() {
  }
}
