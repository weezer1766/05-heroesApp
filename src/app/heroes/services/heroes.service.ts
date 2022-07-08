import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) { }

  private _notificarUpload = new EventEmitter<any>();

  public getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  get notificarUpload(): EventEmitter<any>{
    return this._notificarUpload;
  }

  public getHeroe(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }

  public getBuscarCoincidenciaHeroe(termino: string): Observable<Heroe[]>{
    //http://localhost:3000/heroes?q=a&limit=6
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&limit=6`);
  }

  public postRegistrarHeroe(heroe: Heroe): Observable<Heroe> {
    //return this.http.post<Heroe>(`${this.baseUrl}/heroes/`, heroe, {headers: this.httpHeaders});
    return this.http.post<Heroe>(`${this.baseUrl}/heroes/`, heroe);
  }

  public putActualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }

  public deleteEliminarHeroe(id: String): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
  }

}
