import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/intefaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  slideOpts = {
    freeMode: false
  };
  @Input() peliculas: Pelicula[] = [];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

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
