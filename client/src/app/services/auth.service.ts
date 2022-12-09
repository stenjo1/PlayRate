import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, tap } from 'rxjs';
import { IJwtTokenData } from '../models/jwt-token-data-model';
import { User } from "../models/user.model"
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = {
    registerUrl: "http://localhost:3000/api/users/register",
    loginUrl: "http://localhost:3000/api/users/login",
  }

  private readonly userSubject: Subject<User | null> = new Subject<User | null>();
  public readonly user: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  public sendUserDataIfExists(): User | null {
    const payload: IJwtTokenData | null = this.jwtService.getDataFromToken();
    if(!payload) {
      return null;
    }

    const newUser: User =  new User(payload.id, payload.username,payload.password , payload.email);
    this.userSubject.next(newUser);
    return newUser;
  }

  public register(username: string, password: string, email: string): Observable<User | null> {
    const body = {
      username,
      password,
      email,
    };
    const obs: Observable<{token: string}> = this.http.post<{token: string}>(this.url.registerUrl, body);
  
    // prvo treba sacuvati token, a onda pretvoriti u korisnika
    return obs.pipe(
      tap((response: {token: string}) => this.jwtService.setToken(response.token)),
      map((response: {token: string}) => this.sendUserDataIfExists())
    )
  }

}
