import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  public getHeroe(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }

  public getBuscarCoincidenciaHeroe(termino: string): Observable<Heroe[]>{
    //http://localhost:3000/heroes?q=a&limit=6
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&limit=6`);
  }

}
