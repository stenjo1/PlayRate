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

  public getGames(page:number=1,limit:number=10):Observable<Game[]>{
    const params:HttpParams=new HttpParams().append('page',page).append('limit',limit);
    const obs:Observable<GamesPagination>= this.http.get<GamesPagination>(this.gameUrl + "all", {params: params});    
    return obs.pipe(
      map((pagination:GamesPagination)=>{
        return pagination.docs;
      })
    )
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
    return this.http.get<Post[]>(this.gameUrl + "/reviews" + id);
  }

  public attachPost(gameId: string, postId: string, reviewScore: number) {
    return this.http.put("http://localhost:3000/api/games/post", {"gameId": gameId, "postId": postId, "reviewScore": reviewScore });    
  }

  public getPopularGames(num: number = 10): Observable<Game[]> {
    const params: HttpParams = new HttpParams().append('num', num)
    const obs: Observable<Game[]> = this.http.get<Game[]>(this.gameUrl + "popular", {params: params});   
    return obs;
  }
}

