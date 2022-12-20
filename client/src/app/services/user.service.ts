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
    deleteAPostUrl: "http://localhost:3000/api/users/removePost"
    
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



}
