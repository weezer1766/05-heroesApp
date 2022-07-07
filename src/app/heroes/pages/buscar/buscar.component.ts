import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public termino: string = '';
  public heroes: Heroe[] = [];

  public heroeSeleccionado: Heroe | undefined;

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }

  public buscando(){
    console.log(this.termino);
    this.heroes = [];
    this.heroeSeleccionado = undefined;

    if(!this.termino || this.termino.trim().length==0){
      return;
    }

    this.heroesService.getBuscarCoincidenciaHeroe(this.termino).subscribe({
      next: response => {
        this.heroes = response;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  public opcionSeleccionada(event: MatAutocompleteSelectedEvent){

    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      this.termino = '';
      return;
    }

    console.log(event.option.value);
    let heroe: Heroe = event.option.value;

    this.termino = heroe.superhero;

    this.heroesService.getHeroe(heroe.id!).subscribe(heroe => this.heroeSeleccionado = heroe);
  }
}
