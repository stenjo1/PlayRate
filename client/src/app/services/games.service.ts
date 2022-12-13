import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesPagination } from '../models/games-pagination';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private games: Observable<Game[]> = new Observable;
  constructor(private http: HttpClient) { 
  }

  // GET /api/games/
  public getGamesPagination(page: number = 1, limit: number = 10): Observable<Game[]> {
    const params: HttpParams = new HttpParams().append('page', page).append('limit', limit);
    const obs: Observable<GamesPagination> = this.http.get<GamesPagination>("http://localhost:3000/api/games", { params });

    return obs.pipe(
      map((pagination: GamesPagination) => {
        return pagination.docs;
      })
    );
  }

  public getGames (): Observable<Game[]>{
    const obs: Observable<Game[]> = this.http.get<Game[]>("http://localhost:3000/api/games/all");
    return obs;
  }
  // GET /api/games/:gameId
  public getProductById(gameId: string): Observable<Game> {
    return this.http.get<Game>(`http://localhost:3000/api/games/${gameId}`);
  }

}
