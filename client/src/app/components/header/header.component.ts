import { Component, OnInit, } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, of, switchMap, toArray } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/models/game.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatAutocomplete } from '@angular/material/autocomplete';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  
  title = 'PlayRate';
  public user: Observable<User> = new Observable<User>();
  public games: Observable<Game[]> = new Observable<Game[]>();

  public username?: string | null;
  searchTerm='';
  blankTerm='@@@@@@'
  results:Game[]=[];
  isExpanded = false;

  constructor(private gameService:GamesService,private userService:UserService, private authService : AuthService, private router : Router){
    this.userService.getUserByUsername(this.userService.getCurrentUserUsername()).subscribe(u=>{
      this.username=u.username;
    });
    this.games=gameService.getGamesArray();
    
  }
  ngOnInit(): void {

  }

  isLoggedIn() : boolean {
    return this.authService.userLoggedIn;
  }

  logoutUser() : void {
    this.authService.logoutUser();
    this.router.navigateByUrl("");
  }
  search() {
    this.games.subscribe(array=>{
      this.results=(array.filter(g=>g.name.toLowerCase().includes(this.searchTerm.toLowerCase())));
    })
    if(this.searchTerm==''){
      this.games.subscribe(array=>{
        this.results=(array.filter(g=>g.name.toLowerCase().includes(this.blankTerm)));
      })
    }
  } 


}
