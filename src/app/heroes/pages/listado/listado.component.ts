import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public heroes: Heroe[] = [];

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this. listarHeroes();
  }

  public listarHeroes(){
    this.heroesService.getHeroes().subscribe({
      next: response => {
        console.log(response);
        this.heroes = response;
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
