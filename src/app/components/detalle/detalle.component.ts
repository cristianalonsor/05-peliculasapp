import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/intefaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
// como creo un objeto vacio, sepuede solucionar el problema poninedo el
// ngif en el html y no creando el objeto vacio
// o haciendo opcionales todas las propiedades dentro de la interfaz -> esta opcion se tomo
  pelicula: PeliculaDetalle = {};
  oculto = 150;
  actores: Cast[] = [];
  icono = ' bookmark-outline';

  @Input() id;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };
  constructor(private movieService: MoviesService,
              private modalCtrl: ModalController,
              private dataLocal: DataLocalService) {}

  ngOnInit() {
    // console.log(this.id);
    this.dataLocal.existePelicula(this.id)
    .then( existe => this.icono = (existe) ? 'bookmark' : 'bookmark-outline');

    // console.log('detalle component existe:', existe);
    this.movieService.getPeliculaDetalle(this.id)
    .subscribe( resp => {
      this.pelicula = resp;
      // console.log(resp);
    });
    this.movieService.getActores(this.id)
    .subscribe( resp => {
      this.actores = resp.cast;
      // console.log(resp);
    });
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    // cambio en tiempo real el icono al tocar el favorito para agregar o eliminar en razon de lo que necesite
    const existe = this.dataLocal.guardarPeli(this.pelicula);
    this.icono = (existe) ? 'bookmark' : 'bookmark-outline';
  }

}
