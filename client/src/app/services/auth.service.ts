import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, Subject, map, tap, catchError,of } from 'rxjs';
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

  private failedRegister = false;

  private readonly userSubject: Subject<User | null> = new Subject<User | null>();
  public readonly user: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  public get userLoggedIn(): boolean {
    const jwtToken = this.jwtService.getToken();

    return jwtToken !== '';
  }

  public sendUserDataIfExists(): User | null {
    const payload: IJwtTokenData | null = this.jwtService.getDataFromToken();
    
    if(!payload) {
       return null;
    }

    // TOFIX:
    // Implement a way to see if register was successful!
    
    //if(!this.failedRegister){
      //window.alert("Successful registration!");
      //this.failedRegister = false;
    //}

    const newUser: User =  new User(payload.id, payload.username, payload.email, payload.imgUrl);
    this.userSubject.next(newUser);
    return newUser;
  }

  //TOFIX: this is not the right way of handling the error sendUserDataIfExists is
  //Currently this is being used by register for error handling!
  private handleError(error: HttpErrorResponse): Observable<{ token: string }> {
    const serverError: { message: string; status: number; stack: string } = error.error;
    window.alert(`There was an error: ${serverError.message}. `);
    this.failedRegister=true;
    return of({ token: this.jwtService.getToken() });
  }

  public register(username: string, password: string, email: string): Observable<User | null> {
    this.failedRegister = false;
    const body = {
      username,
      password,
      email,
    };
    
    const obs: Observable<{token: string}> = this.http.post<{token: string}>(this.url.registerUrl, body);
    
    return obs.pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      // TOFIX:?
      // This will stop auto login after registering so that you have to manualy login
      //tap((response: {token: string}) => this.jwtService.setToken(response.token)),
      map((response: {token: string}) => this.sendUserDataIfExists())
    )
  }

  public login(email: string, password: string): Observable<User | null> {
    const body = {
      email,
      password
    };

    const obs: Observable<{token: string}> = this.http.post<{token: string}>(this.url.loginUrl,body);

    return obs.pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      tap((response: {token: string}) => this.jwtService.setToken(response.token)),
      map((response: {token: string}) => this.sendUserDataIfExists())
    )
  }

  public logoutUser(): void {
    this.jwtService.removeToken();
    this.userSubject.next(null);
  }

}
