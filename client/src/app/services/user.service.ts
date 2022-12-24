import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, tap,  of } from "rxjs";
import { JwtService } from "./jwt.service";
import { User } from "../models/user.model"
import { map ,catchError } from "rxjs/operators";
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
    putAPostUrl: "http://localhost:3000/api/users/addPost",
    deleteAPostUrl: "http://localhost:3000/api/users/removePost",
    putFinishedGame: "http://localhost:3000/api/users/addFinishedGame",
    putPlayingGame: "http://localhost:3000/api/users/addPlayingGame",
    putBacklogGame: "http://localhost:3000/api/users/addBacklogGame",
    deleteFinishedGame: "http://localhost:3000/api/users/removeFinishedGame",
    deletePlayingGame: "http://localhost:3000/api/users/removePlayingGame",
    deleteBacklogGame: "http://localhost:3000/api/users/removeBacklogGame",
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

  private handleError(error: HttpErrorResponse): Observable<{ token: string }> {
    const serverError: { message: string; status: number; stack: string } = error.error;
    window.alert(`There was an error: ${serverError.message}. `);
    return of({ token: this.jwtService.getToken() });
  }

  public getCurrentUserId(){
    if (this.curUser)
      return this.curUser.id;
    else
      return " " //baci gresku
  }

  public getGames() : Observable< GameResponse | null > {
    const obs : Observable<GameResponse> = this.http.get<GameResponse>(this.url.getGamesUrl + "/" + this.curUser?.username);
    return obs.pipe(
      // TOFIX 
      // This chunk of code should be removed due to bloat because it's only a test 
      tap((response: GameResponse) => console.log("Javljam se iz pipe!!!"  + response.finishedGames)),
    );
  }
  
  public putAPost(postIdNum : string) : Observable<{token:string}> {
    
    const headers: HttpHeaders = new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`);
    const body = {
      username : this.curUser?.username,
      postId : postIdNum,
    }

    const obs: Observable<{token: string}> = this.http.put<{token : string}>(this.url.putAPostUrl,body,{headers})

    return obs.pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  public deleteAPost(postIdNum : string) : Observable<{token:string}> {
    
    const headers: HttpHeaders = new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`);

    const body = {
      username : this.curUser?.username,
      postId : postIdNum,
    }

    const options = {
      headers : headers,
      body : body 
    }

    const obs: Observable<{token: string}> = this.http.delete<{token : string}>(this.url.deleteAPostUrl,options)

    return obs.pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  public putFinishedGame(gameIdNum : string) : Observable<{token:string}> {
    
    const headers: HttpHeaders = new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`);
    const body = {
      username : this.curUser?.username,
      gameId : gameIdNum,
    }

    const obs: Observable<{token: string}> = this.http.put<{token : string}>(this.url.putFinishedGame,body,{headers})

    return obs.pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  public putPlayingGame(gameIdNum : string) : Observable<{token:string}> {
    
    const headers: HttpHeaders = new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`);
    const body = {
      username : this.curUser?.username,
      gameId : gameIdNum,
    }

    const obs: Observable<{token: string}> = this.http.put<{token : string}>(this.url.putPlayingGame,body,{headers})

    return obs.pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  public putBacklogGame(gameIdNum : string) : Observable<{token:string}> {
    
    const headers: HttpHeaders = new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`);
    const body = {
      username : this.curUser?.username,
      gameId : gameIdNum,
    }

    const obs: Observable<{token: string}> = this.http.put<{token : string}>(this.url.putBacklogGame,body,{headers})

    return obs.pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  public deleteFinishedGame(gameIdNum : string) : Observable<{token:string}> {
    
    const headers: HttpHeaders = new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`);

    const body = {
      username : this.curUser?.username,
      gameId : gameIdNum,
    }

    const options = {
      headers : headers,
      body : body 
    }

    const obs: Observable<{token: string}> = this.http.delete<{token : string}>(this.url.deleteFinishedGame,options)

    return obs.pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  public deletePlayingGame(gameIdNum : string) : Observable<{token:string}> {
    
    const headers: HttpHeaders = new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`);

    const body = {
      username : this.curUser?.username,
      gameId : gameIdNum,
    }

    const options = {
      headers : headers,
      body : body 
    }

    const obs: Observable<{token: string}> = this.http.delete<{token : string}>(this.url.deletePlayingGame,options)

    return obs.pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  public deleteBacklogGame(gameIdNum : string) : Observable<{token:string}> {
    
    const headers: HttpHeaders = new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`);

    const body = {
      username : this.curUser?.username,
      gameId : gameIdNum,
    }

    const options = {
      headers : headers,
      body : body 
    }

    const obs: Observable<{token: string}> = this.http.delete<{token : string}>(this.url.deleteBacklogGame,options)

    return obs.pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }
  
}
