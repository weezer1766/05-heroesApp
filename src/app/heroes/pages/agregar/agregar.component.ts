import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { Heroe } from '../../interfaces/heroes';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  public heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.cargarHeroe();
  }

  private cargarHeroe(): void{

    this.activatedRoute.params
    .pipe(
      tap( console.log ),
      switchMap(
        (params) => {

          return this.heroesService.getHeroe(params['id']);
          /*
          return this.heroesService.getHeroe(params['id']).pipe(
            catchError(
              error =>{
                console.log('TU MADRE1');
                console.log(error);
                return throwError(()=>error);
              }
            )
          );
          */
        }
      ),
      /*
      catchError(
        error =>{
          console.log('TU MADRE2');
          console.log(error);
          return throwError(()=>error);
        }
      ),
      */
      tap( console.log ),
    )
    .subscribe({
      next: response => {
        this.heroe = response;
      },
      error: err => {
        console.log('SE PRODUJO UN ERROR');
        console.log(err);
      }
    })

    /*
    this.activatedRoute.params.subscribe({
      next: params => {
        let id = params['id'];

        if(id){
          this.heroesService.getHeroe(id).subscribe({
            next: response => {
              this.heroe = response;
              console.log(this.heroe);
            },
            error: err => {
              console.log(err);
            }
          });
        }
      },
      error: err => {
        console.log(err);
      }
    });
    */
  }

}
