import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { GamesPagination } from '../models/games-pagination';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private readonly gameUrl = 'http://localhost:3000/api/games/';

  constructor(private http:HttpClient) {
  }
  getGames(page:number=1,limit:number=10):Observable<Game[]>{
    const params:HttpParams=new HttpParams().append('page',page).append('limit',limit);
    const obs:Observable<GamesPagination>= this.http.get<GamesPagination>(this.gameUrl + "all");    
    return obs.pipe(
      map((pagination:GamesPagination)=>{
        return pagination.docs;
      })
    )
  }

  public getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(this.gameUrl+id);
  }

}
