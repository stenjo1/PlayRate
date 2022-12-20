import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, tap,  of } from "rxjs";
import { JwtService } from "./jwt.service";
import { User } from "../models/user.model"
import { map, catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";


export interface GameResponse{
    finishedGames : [],
    playingGames : [],
    backlogGames : [],
}

@Injectable({
  providedIn: 'root'
})

export class UserService{

  
  private readonly url = {
    getGamesUrl: "http://localhost:3000/api/users/games",
    
  }

  private curUser : User | null = null;

  //TO_TEST: 
  //  I'm unsure if this code will work if the user is loged out and the new one
  // logs in, this actualy might be stuck on the old one! 
  // Alltho it should be fine once we add guards, it remains to be seen!
  constructor(private http: HttpClient,private authService: AuthService, private jwtService: JwtService){
    this.authService.user.subscribe((user : User | null) =>{
      this.curUser = user;   
    });
    this.authService.sendUserDataIfExists();
  }

  public getGames() : Observable< GameResponse | null > {
    const obs : Observable<GameResponse> = this.http.get<GameResponse>(this.url.getGamesUrl + "/" + this.curUser?.username);
    return obs.pipe(
      tap((response: GameResponse) => console.log("Javljam se iz pipe!!!"  + response.finishedGames)),
    );
  }
  
  



}
