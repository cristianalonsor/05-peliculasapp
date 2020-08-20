import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Pelicula } from '../../interfaces/intefaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  txtBuscar = '';
  buscando = false;
  peliculaEncontrada: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Toy Story', 'Interestellar', 'El Origen'];
  constructor(private movieService: MoviesService, private modalCtrl: ModalController) {}

  ngOnInit(){

  }

  buscar( event ){

    const valor = event.detail.value;
    // manejo del error por que el valor === null, '', borre la wea
    if ( valor.length === 0 || valor.length === '' || valor.length === null){
      this.buscando = false;
      this.peliculaEncontrada = [];
      return;
    }
    // console.log(valor);
    this.buscando = true;
    this.movieService.getBuscarPelicula(valor)
    .subscribe( resp => {
      // tslint:disable-next-line: no-string-literal
      this.peliculaEncontrada = resp['results'];
      this.buscando = false;
      // console.log(resp);
    })
    ;
  }

  async mostrarPelicula(id: string){

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
