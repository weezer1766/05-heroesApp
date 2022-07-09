import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  public get auth(): Auth {
    return {...this._auth!};
  }

  constructor(
    private http: HttpClient
  ) { }

  public verifyAuth(): Observable<boolean>{

    let id = localStorage.getItem('token');

    if(!localStorage.getItem('token')){
      return of(false);
      //return false;
    }

    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/${id}`).pipe(
      map(
        response => {
          this._auth = response;
          return true;
        }
      )
    );
  }

  public login(id: number): Observable<Auth> {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/${id}`).pipe(
      tap(
        response => {
          this._auth = response;
          //localStorage.setItem('id', this._auth.id);
        }
      ),
      tap(
        response => {
          localStorage.setItem('token', response.id.toString());
        }
      )
    );
  }

  public logout() {
    this._auth = undefined;
    localStorage.removeItem('token');
  }

}
