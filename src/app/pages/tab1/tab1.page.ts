import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Pelicula, RespuestaMDB } from '../../interfaces/intefaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  peliculasRecientes: Pelicula[] = [];
  peliculasPopulares: Pelicula[] = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit(){
    this.movieService.getFeature()
    .subscribe( resp => {
      this.peliculasRecientes = resp.results;
    });
    this.getPopulares();
  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    // recibo solamente las peliculas populares ordenadas en orden decreciente
    this.movieService.getPopulares()
    .subscribe( resp => {

      // console.log('peliculas', resp);
      const arrTemp = [...this.peliculasPopulares, ...resp.results];
      // añado las peliculas al arreglo, pero no cayendo encima de los que estaban sino que los añade a la cola
      this.peliculasPopulares = arrTemp;

    });
  }
}
