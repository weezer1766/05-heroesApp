import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  public heroe!: Heroe;

  constructor(
    private router: Router,
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
        }
      ),
      tap( console.log ),
      delay(200)
    )
    .subscribe(
      response => {
        this.heroe = response;
      }
    )
  }

  public regresar(): void{
    this.router.navigate(['/heroes/listado']);
  }

}
