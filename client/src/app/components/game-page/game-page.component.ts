import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';

declare const $:any;

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit{

  game:Observable<Game>=new Observable<Game>();

  liked:Boolean=false;

  reviews:String[]=[
    "I played almost 10 years of this game and now i just realize how toxic unbalanced depressive thing is this. its not make fun anymore, just buy skins and make new champs for asians. so annoying this game. i really hate now this game.",
    "If you like to play with tards, cp, downsyndromed and ect go play lerage of legends. by far the game with most tards, braindeads and handicaps. So if you one of the above go ahead play leage with your handicapped non thinking team mates nvm thay accly more enemy then team.... cs 1.6, minecraft, tf 2, rublox, and smite are WAY better",
    "Hey, if you want get mad becouse of others thats the game, basicly you get rudest game ever, rare good team fights , 85% games you be angree and anoyed by others",
    "I played almost 10 years of this game and now i just realize how toxic unbalanced depressive thing is this. its not make fun anymore, just buy skins and make new champs for asians. so annoying this game. i really hate now this game.",
    "I played almost 10 years of this game and now i just realize how toxic unbalanced depressive thing is this. its not make fun anymore, just buy skins and make new champs for asians. so annoying this game. i really hate now this game.",
    "I played almost 10 years of this game and now i just realize how toxic unbalanced depressive thing is this. its not make fun anymore, just buy skins and make new champs for asians. so annoying this game. i really hate now this game.",
    "I played almost 10 years of this game and now i just realize how toxic unbalanced depressive thing is this. its not make fun anymore, just buy skins and make new champs for asians. so annoying this game. i really hate now this game.",
    "I played almost 10 years of this game and now i just realize how toxic unbalanced depressive thing is this. its not make fun anymore, just buy skins and make new champs for asians. so annoying this game. i really hate now this game.",

  ];

  constructor(private gameService:GamesService){
    this.game=this.gameService.getGameById('6398ae415cfe38600a48d5d4');
  }

  ngOnInit(): void {
    $('.ui.rating').rating();
  }
  
  getRating():void{
    // const rate = $('.ui.rating').rating("get value");
    // this.game.rating=rate
    // console.log
  }
  onLikeButton(){
    // if(!this.liked){
    //   this.liked=true;
    //   this.game.likes+=1;
    // }
  }
}
