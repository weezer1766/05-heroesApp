import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  public heroe: Heroe = {
    superhero:        '',
    publisher:        Publisher.Seleccione,
    alter_ego:        '',
    first_appearance: '',
    characters:       '',
    alt_img:          ''
  };

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    //console.log(this.router.url.includes('editar'));

    if(!this.router.url.includes('editar')){
      return;
    }

    this.cargarHeroe();
    this.notificarActualizacionImagenHeroe();
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
        //console.log(response);
        this.heroe = response;
      },
      error: err => {
        console.log('SE PRODUJO UN ERROR');
        console.log(err);
      }
    });

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

  public notificarActualizacionImagenHeroe(){
    this.heroesService.notificarUpload.subscribe({
      next: (heroe: Heroe) => {
        console.log('notificar');
        console.log(heroe);
        this.heroe = heroe;
      }
    });
  }

  public mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }

  public guardar(): void{

    if(this.heroe.superhero.trim().length === 0){
      console.log('No se ingreso nombre del superheroe');
      return;
    }
    if(this.heroe.publisher == null || this.heroe.publisher == undefined || this.heroe.publisher == ''){
      console.log('No se selecciono un creador');
      return;
    }

    if(this.heroe.id){

      //ACTUALIZAR
      this.heroesService.putActualizarHeroe(this.heroe).subscribe({
        next: response => {
          console.log('ACTUALIZAR');
          //console.log(response);

          //PRIMERA FORMA
          this.heroe = response;
          //SEGUNDA FORMA
          //this.heroesService.notificarUpload.emit(response);

          this.mostrarSnackBar('Se actualizó el registro el héroe');
        },
        error: err =>{
          console.log(err);
        }
      });

    } else {

      //REGISTRAR
      this.heroesService.postRegistrarHeroe(this.heroe).subscribe({
        next: response => {
          console.log('REGISTRAR');
          //console.log(response);

          this.mostrarSnackBar('Se registro correctamente el héroe');

          this.router.navigate(['/heroes/editar', response.id]);
        },
        error: err =>{
          console.log(err);
        }
      });

    }

  }

  public eliminar(): void{

    const dialog = this.dialog.open(ConfirmarComponent,
      {
        width: '250px',
        data: {...this.heroe}
        /*
        data: {
          heroe: {...this.heroe}, //Se recomienda utilizar el operador spread '{...object}'
                                  //con la finalidad de evitar enviar por referencia el objeto
                                  //hacia el dialogo, de esta manera nos aseguramos que si en
                                  //componente que se usará como dialogo se modifica el objeto
                                  //no impacte o no pase por referencia dicho cambio al objeto
                                  //original
          otraVariable: 'Otra variable'
        }
        */
      }
    );

    dialog.afterClosed().subscribe({
      next: response => {
        if(response){
          this.heroesService.deleteEliminarHeroe(this.heroe.id!).subscribe({
            next: response => {
              console.log('ELIMINAR');
              //console.log(response);

              this.mostrarSnackBar('Se eliminó el registro el héroe');
              this.router.navigate(['/heroes']);
            },
            error: err =>{
              console.log(err);
            }
          });
        }
      },
      error: err => {

      }
    });

  }

}
