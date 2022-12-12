import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { JwtService } from "./jwt.service";
import { User } from "../models/user.model"
import { map, catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
}
