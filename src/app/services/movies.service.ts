import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/intefaces';
import { environment } from '../../environments/environment';

// traigo desde el ambiente  pero no desde el produccion
const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) { }

// optimiza la query que se le hace hacia el servicio
  private ejecutarQuery<T>( query: string){// este metodo solo funciona en este servicio

    query = URL + query;
    // se manejan las constantes tras la url
    query += `&api_key=${apiKey}&language=es&include_imaeg_language=es`;
    // console.log(query);
    // siempre especificar el tipo de lo que paso o lo que recibo
    return this.http.get<T>(query);
  }

// getCartelera

  getFeature(){

    // calcular las fechas sin importar el dia del año
    const hoy = new Date();
    // obtengo la fecha del ultimo dia del mes
    const uDiaMes = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    // calculo el mes en el que estoy
    const mes = hoy.getMonth() + 1;
    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${ mesString }-01`;
    const fin    = `${hoy.getFullYear()}-${ mesString }-${ uDiaMes }`;
                                            // aca esta solo el codigo unico de la peticion al api
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares(){
    // esta inicializado en 0, pero cada vez que se llama le suma uno a la pagina, y cambia los resultados
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getPeliculaDetalle( id: string){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  getActores( id: string ){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
  }

  getBuscarPelicula(name: string){
    return this.ejecutarQuery<PeliculaDetalle>(`/search/movie?query=${ name }`);
  }

  cargarGeneros(): Promise<Genre[]>{

    /*
    regresa una promesa, cuando hace el suscribe regresa los generos y dejo explicito arriba que debe retornar
    una promesa con un arreglo de tipo de generos
    */
    return new Promise( resolve => {

      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe( resp => {
        this.generos = resp['genres'];
        // console.log(this.generos);
        resolve(this.generos);

      });
    });


  }

}
