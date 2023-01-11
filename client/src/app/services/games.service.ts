import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { GamesPagination } from '../models/games-pagination';
import { Game } from '../models/game.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private readonly gameUrl = 'http://localhost:3000/api/games/';

  constructor(private http:HttpClient) {
  }

  public getGamesPagination(page:number=1,limit:number=10):Observable<GamesPagination>{
    const params:HttpParams=new HttpParams().append('page',page).append('limit',limit);
    const obs:Observable<GamesPagination>= this.http.get<GamesPagination>(this.gameUrl, {params: params});    
    return obs;
  }

  public getGamesArray (): Observable<Game[]>{
    const obs: Observable<Game[]> = this.http.get<Game[]>("http://localhost:3000/api/games/all");
    return obs;
  }


  public getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(this.gameUrl+id);
  }

  public getGameNameById(id: string): Observable<string> {
    return this.http.get<Game>(this.gameUrl+id).pipe(map((game)=>game.name));
  }

  public getGameReviews(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.gameUrl + "reviews/" + id);
  }

  public attachPost(gameId: string, postId: string, reviewScore: number) {
    return this.http.put("http://localhost:3000/api/games/post", {"gameId": gameId, "postId": postId, "reviewScore": reviewScore });    
  }

  public updateReviewScore(gameId: string, oldScore: number, newScore: number) : Observable<number> {
    return this.http.patch<number>("http://localhost:3000/api/games/update", {"gameId": gameId, "oldScore": oldScore, "newScore": newScore});    
  }

  public removePost(postId: string, gameId: string, postReviewScore: number) {
    return this.http.patch("http://localhost:3000/api/games/removepost", {"postId": postId, "gameId": gameId, "postReviewScore": postReviewScore});    
  }

  public getPopularGames(num: number = 10): Observable<Game[]> {
    const params: HttpParams = new HttpParams().append('num', num)
    const obs: Observable<Game[]> = this.http.get<Game[]>(this.gameUrl + "popular", {params: params});   
    return obs;
  }
}

