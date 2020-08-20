import { Injectable } from '@angular/core';
import { PeliculaDetalle, Genre, Pelicula } from '../interfaces/intefaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculasFav: PeliculaDetalle [] = [];


  constructor(private storage: Storage,
              private toastCtrl: ToastController) { this.cargarFavoritos(); }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration: 900
    });
    toast.present();
  }

  guardarPeli( pelicula: PeliculaDetalle){

    // verificar si existe la pelicula dentro del localstorage
    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculasFav){
      if (peli.id === pelicula.id){
        existe = true;
        break;
      }
    }
    // filtrar la pelicula que existe, excluyendola por el id para no agregarla
    if ( existe ){
      this.peliculasFav = this.peliculasFav.filter( peli => peli.id !== pelicula.id);
      mensaje = 'Eliminada de Favoritos';
    } else {
      // guarda dentro del storage local la pelicula que elegiste en favorito
      this.peliculasFav.push(pelicula);
      mensaje = 'Guardada en Favoritos';
    }
    this.storage.set('peliculas', this.peliculasFav);
    this.presentToast(mensaje);

    return !existe;
  }

  /*se cargan los favoritos desde el momento que se crea el constructor al inicializarse
  hay dos formas de realizarlo, mediante una promesa como el que haremos
  */
  async cargarFavoritos(){
    // retorna promesa con los favoritos cargados
    const peliculas = await this.storage.get('peliculas');
    this.peliculasFav = peliculas || [];
    return this.peliculasFav;
  }

  async existePelicula( id ){

    /*console.log(id);
    id = Number( id );
    console.log(id);
    */
    await this.cargarFavoritos();
    const existe = this.peliculasFav.find( peli => peli.id === id );
    // si existe y es un objeto retornara un true y si no esta es un false
    return (existe) ? true : false;
  }
}
