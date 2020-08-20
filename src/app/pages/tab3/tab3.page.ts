import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre, Pelicula } from '../../interfaces/intefaces';
import { DataLocalService } from '../../services/data-local.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle [] = [];
  generos: Genre[] = [];
  favoritoPorGenero: any[] = [];

  constructor(private dataLocal: DataLocalService, private movieService: MoviesService) {}

  async ionViewWillEnter(){

   // las peliculas cargadas son el retorno de la promesa de las peliculas favoritas
   this.peliculas =  await this.dataLocal.cargarFavoritos();
   // llamando servicio de pelicula trayendo los generos
   this.generos = await this.movieService.cargarGeneros();
   // console.log(this.peliculas);
   this.cargarPorTipo(this.peliculas, this.generos);
  }

  cargarPorTipo(peliculas: PeliculaDetalle[], generos: Genre[]){
    // tomo el arreglo y lo inicializo vacio en caso de cualquier cosa
    this.favoritoPorGenero = [];
    // barro los generos con el foreach, cada elemento del arreglo
    generos.forEach( genero => { 
      // creo un elemento con caracteristicas genero y la pelicula del genero
      this.favoritoPorGenero.push({

        genero: genero.name,
        // necesito barrer las peliculas a ver si cumplen la condicion necesitada
        // que es que tengan el mismo id, el genero y el genero de la pelicula
        // a ver si coinciden los id's, lo agrego al arreglo
        pelis: peliculas.filter(peli => {
          return peli.genres.find( genre => genero.id === genre.id);
        })
      });

    });
    console.log(this.favoritoPorGenero);

  }

}
